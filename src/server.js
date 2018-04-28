import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import template from './template';
import calc from './app/calc'

const server = express();

function map_to_object(map) {
    const out = Object.create(null)
    map.forEach((value, key) => {
        if (value instanceof Map) {
            out[key] = map_to_object(value)
        }
        else {
            out[key] = value
        }
    })
    return out
}

server.use('/assets', express.static('assets'));

server.get('/', (req, res) => {
  const name = '杨静';
  const data = new calc().calc(name);
  console.log(data)
  let self  = new Map();
  for (let key in data.self) {
    self.set(key, data.self[key])
  }
  self = map_to_object(self)
  let other = new Map();
  for (let key in data.other) {
    other.set(key, data.other[key])
  }
  other = map_to_object(other);
  let outter = new Map();
  const headers = ['项目导向', '沟通能力', '团体协作', '责任意识', '情绪控制'];
  headers.forEach(item => {
      outter.set(item, data.outter[item])
  })
  outter = map_to_object(outter)

  const initialState = { name, self, other, outter };
  const appString = renderToString(<App {...initialState}/>);
  console.log(JSON.stringify(initialState))

  res.send(template({
    body: appString,
    title: 'Hello World from the server',
    initialState: JSON.stringify(initialState)
  }));
});

server.listen(8080);
console.log('listening');
