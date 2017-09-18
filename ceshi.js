function thisBind() {
    console.log(this.name);
}
const obj = {
    name: 'baobei',
    fn: thisBind
}
obj.fn();
const bar = obj.fn;
var name = 'beibei';
bar();

setTimeout(obj.fn, 1000);
