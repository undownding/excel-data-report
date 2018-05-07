import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import template from './template';
import calc from './app/calc'
import fs from 'fs'

const server = express();

let date = ''
fs.readFile('assets/public/date.txt','utf-8',function(err,data){
    if (err) {
        date = '内容读取失败'
    } else {
        date = data
    }
})

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

server.get('/p/:name', (req, res) => {
  const name = req.params.name;
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
  let up = new Map();
  for (let key in data.up) {
    up.set(key, data.up[key])
  }
  up = map_to_object(up)
  let mate = new Map();
  for (let key in data.mate) {
    mate.set(key, data.mate[key])
  }
  mate = map_to_object(mate)
  let down = new Map();
  for (let down in data.dowwn) {
    down.set(key, data.down[key])
  }
  down = map_to_object(down)

  const initialState = { name, self, other, outter, up, mate, down, date, caq: data.caq, pdp: data.pdp };
  const appString = renderToString(<App {...initialState}/>);
  console.log(JSON.stringify(initialState))

  res.send(template({
    body: appString,
    title: name,
    initialState: JSON.stringify(initialState)
  }));
});

server.listen(8080);
console.log('listening');
