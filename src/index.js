if (module.hot) {
    module.hot.accept();
}
import say from '@/module/a'
import '@/assets/app.css'

say.sayName();
console.log(1334);


let moduleName = 'a';
import(`./module/${moduleName}`).then(module=>{
    console.log(module.default);
})