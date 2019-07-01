module.exports = async function (inp, callback) {
   await msg();
    callback(inp + " printing ");
  }

  function sayTrue() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }
  
  async function msg() {
    const msg = await sayTrue();
    console.log('Message:', msg);
  }