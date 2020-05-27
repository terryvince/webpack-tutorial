if (module.hot) {
    module.hot.accept();
}
import say from '@/module/a'
import '@/assets/app.css'
import Vue from 'vue'
import React from 'react'
import ReactDOM from 'react-dom'
import HelloVue from '@/components/helloWorld'
import HelloReact from '@/components/HelloReact'

say.sayName();
console.log(1334);


let moduleName = 'a';
import(`./module/${moduleName}`).then(module=>{
    console.log(module.default);
})
  
ReactDOM.render(
    <HelloReact name="Taylor1" />,
    document.getElementById('helloReact')
);

new Vue({
    el: '#helloVue',
    render: h => h(HelloVue)
})