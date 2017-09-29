// function thisBind() {
//     console.log(this.name);
// }
// const obj = {
//     name: 'baobei',
//     fn: thisBind
// }
// obj.fn();
// const bar = obj.fn;
// var name = 'beibei';
// bar();

// setTimeout(obj.fn, 1000);



// function People(name, age) {
//     this.name = name;
//     this.age = age;
// }
// People.prototype.say = function() {
//     console.log('我是' + this.name + '，我今年' + this.age + '岁');
// }

// function Man(name, age, sex) {
//     People.call(this, name, age);
//     this.sex = sex;
// }

// Man.prototype = new People();
// Man.prototype.constructor = Man;
// Man.prototype.say() = function() {
//     console.log('我是' + this.name + '，我今年' + this.age + '岁,性别' + this.sex)
// }



// Function.prototype.extends = function(props){
//     var self = this;
//     var Parent = function(){};
//     Parent.prototype = self.prototype;
    
//     var prev = new Parent();
    
//     var _super = function(){
//         return self.apply(this, arguments);
//     }
    
//     function Child(){
//         if(props.constructor){
//             props.constructor.apply(this, arguments);
//         }
        
//         for(var i in self.prototype){
//             _super[i] = self.prototype[i].bind(this);
//         }
//     }
    
//     Child.prototype = prev;
//     Child.prototype._super = _super;
  
//     for(var i in props){
//       if(i !== 'constructor'){
//         Child.prototype[i] = props[i];
//       }
//     }
    
//     return Child;
//   }
  
//   function People(name, age){
//     this.name = name;
//     this.age = age;
//   }
  
//   People.prototype.say = function(){
//     console.log('我是'+this.name+'，我今年'+this.age+'岁');
//   }
  
//   var Man = People.extends({
//     constructor: function(name, age){
//         this._super(name, age);
//         this.sex = 'male';
//     },
//     say: function(){
//         console.log('我是'+this.name+'，我今年'+this.age+'岁，性别'+this.sex);
//     }
//   });
  


// function getCbName (prefix, num) {
// 	return prefix + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, num)
// }

// function createScript (src) {
// 	const script = document.createElement('script')
// 	script.setAttribute('type', 'text/javascript')
// 	script.setAttribute('src', src)
// 	script.async = true
// 	return script
// }


// function jsonp (url) {
// 	return new Promise((resolve, reject) => {
// 		const _cb = getCbName('callback')
// 		window[_cb] = function (data) {
// 			resolve(data)
// 		}
// 		url += url.indexOf('?') > -1 ? '&' : '?'
// 		const script = createScript(`${url}callback=${_cb}`)
// 		script.onload = function () {
// 			script.onload = null
// 			if (script.parentNode) {
// 				script.parentNode.removeChild(script)
// 			}
// 			window[_cb] = null
// 		}
// 		script.onerror = function () {
// 			reject()
// 		}
//         document.getElementsByTagName('head')[0].appendChild(script)
// 	})
// }

// //生成一个script标签
// function createScript(_url, _id) {
// const script = document.createElement('script');
// script.setAttribute('src', _url);
// script.id = _id;
// document.getElementsByTagName('head')[0].appendChild(script);
// }

// function createScript(_url, _id) {
// const script = document.createElement('script');
// script.setAttribute('src', _url);
// script.id = _id;
// document.getElementsByTagName('head')[0].appendChild(script);
// }
// function thisBind(){
//     console.log(this.name);
// }
// obj1 = {
//     name: 'laihuamin',
//     fn: thisBind
// }

// obj2 = {
//     name: 'huaminlai',
//     fn: thisBind
// }
let str = '来铧敏';
let encodeStr = escape(str);
console.log(encodeStr);
