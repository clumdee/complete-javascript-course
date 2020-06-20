let x = 5

// async function f() {

//     try {
//       let response = await fetch('/no-user-here');
//       let user = await response.json();
//     } catch(err) {
//       // catches errors both in fetch and response.json
//       alert(err);
//     }
//   }
  
//   f();

//   async function f() {
//     let response = await fetch('http://no-such-url');
//   }
  
//   // f() becomes a rejected promise
//   f()//.catch(alert); // TypeError: failed to fetch // (*)


document.querySelector('.search').addEventListener('click', e => {
    e.preventDefault()
    console.log(e) 
    console.log('hi')
})