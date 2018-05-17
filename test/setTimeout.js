setTimeout(function () {
    console.log('setTimeout');
  
    setTimeout(function () {
      console.log('setTimeout in setTimeout');
    }, 0);
  
    setImmediate(function () {
      console.log('setImmediate in setTimeout');
    });
    
    process.nextTick(function () {
      console.log('nextTick in setTimeout');
    });
  }, 0);
  
  setImmediate(function () {
    console.log('setImmediate');
  
    setTimeout(function () {
      console.log('setTimeout in setImmediate');
    }, 0);
  
    setImmediate(function () {
      console.log('setImmediate in setImmediate');
    });
    
    process.nextTick(function () {
      console.log('nextTick in setImmediate');
    });
  });
  
  process.nextTick(function () {
    console.log('nextTick');
  
    setTimeout(function () {
      console.log('setTimeout in nextTick');
    }, 0);
  
    setImmediate(function () {
      console.log('setImmediate in nextTick');
    });
    
    process.nextTick(function () {
      console.log('nextTick in nextTick');
    });
  });
  
  console.log('main thread');