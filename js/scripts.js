/*!
 * Start Bootstrap - Creative v6.0.3 (https://startbootstrap.com/themes/creative)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
 */
(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 72,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 75,
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Magnific popup calls
  $("#portfolio").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    },
  });
})(jQuery); // End of use strict

//Sign up
function signUp() {
  var firstName = document.getElementById("firstName").value;
  var x = verifLength(firstName, 3);
  if (!x) {
    document.getElementById("firstNameMsg").innerHTML =
      "First Name must have at least 3 characters";
  } else {
    document.getElementById("firstNameMsg").innerHTML = "";
  }
  lastName = document.getElementById("lastName").value;
  var y = verifLength(lastName, 3);
  if (!y) {
    document.getElementById("lastNameMsg").innerHTML =
      "Last Name must have at least 3 characters";
  } else {
    document.getElementById("lastNameMsg").innerHTML = "";
  }

  var email = document.getElementById("email").value;

  var e = checkIfEmailExist(email);
  if (e) {
    document.getElementById("emailMsg").innerHTML = "Email already exist ";
  } else {
    document.getElementById("emailMsg").innerHTML = "";
  }

  var cin = document.getElementById("cin").value;
  var c = checkIfCinExist(cin);

  if (c) {
    document.getElementById("cinMsg").innerHTML = "Cin already exist ";
  } else {
    document.getElementById("cinMsg").innerHTML = "";
  }

  var pwd = document.getElementById("pwd").value;

  var z = verifPwd(pwd, 8);
  var Z = verifPwdNumber(pwd);
  var p = Z && z;
  if (!p) {
    document.getElementById("pwdMsg").innerHTML =
      "Password must have at least 8 characters and a number ";
  } else {
    document.getElementById("pwdMsg").innerHTML = "";
  }
  var confirmPwd = document.getElementById("confirmPwd").value;
  var w = confirmPwd1(confirmPwd, pwd);
  if (!w) {
    document.getElementById("confirmPwdMsg").innerHTML =
      "Password dont match what you already put";
  } else {document.getElementById("confirmPwdMsg").innerHTML =
  "";
  }
  var tel = document.getElementById("tel").value;
  var v = verifTel(tel);
  if (v) {
    document.getElementById("telMsg").innerHTML = "not a number";
  } else {
    document.getElementById("telMsg").innerHTML = "";
  }
  
  
  var city = document.getElementById("city").value;
  console.log(city);
  var i = verifCity(city);
  console.log(i);
  
  if (i) { 
   document.getElementById("cityMsg").innerHTML="required field "
  } 
   else {
    document.getElementById("cityMsg").innerHTML = "";
  }
  var address = document.getElementById("address").value; 
  
  var userType = document.getElementById("userType").value;
  var idU = JSON.parse(localStorage.getItem("idU") || "1");

  var user = {
    id: Number(idU),
    fName: firstName,
    lName: lastName,
    email: email,
    pwd: pwd,
    tel: tel,
    userType: userType,
    cName: city,
    cNumber:cin,
    address:address
  
  };

  if (x && y && !e && !c && p && w && !v && !i) {
    var T = JSON.parse(localStorage.getItem("users") || "[]");
    T.push(user);
    localStorage.setItem("users", JSON.stringify(T));
    localStorage.setItem("idU", Number(idU) + 1);
  }
}
//Login


function login() {
  
  
  var tel = document.getElementById("tel").value;
  var pwd = document.getElementById('pwd').value;
  console.log(tel);
  console.log(pwd);
  var i = 0;
  var T = JSON.parse(localStorage.getItem("users") || "[]");
  console.log(T);
  while (i < T.length && (T[i].tel != tel || T[i].pwd != pwd)) {
    
 i++ }
  console.log(i);
  if (i == T.length) {
    return null;
   
  }

  else {
    if (T[i].userType == "0") {
      localStorage.setItem("connectedUser", JSON.stringify(T[i]));
      location.replace("dashboard.html");
    } else {
      localStorage.setItem("connectedUser", JSON.stringify(T[i]));
      
      location.replace("game.html");
    }
    return T[i];
  }
    
}



/*admin dashboard */
function displayUser() {
  var T=JSON.parse(localStorage.getItem("users") || "[]")
  var render= `<table class="table"  >
  <thead class="thead-dark">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Phone</th>
      <th scope="col">City</th>
      <th scope="col">CIN</th>
      <th scope="col">Address</th>
      <th scope="col"></th>
    </tr>
  </thead> 
  <tbody>`
 for (let i = 0; i < T.length; i++) {
   if (T[i].userType==1) { 
    render +=  `    <tr>
     <th scope="row">${T[i].id}</th>

     <td>${T[i].fName}</td>
     <td>${T[i].lName}</td>
     <td>${T[i].email}</td>
     <td>${T[i].pwd}</td>
     <td>${T[i].tel}</td>
     <td>${T[i].cName}</td>
     <td>${T[i].cNumber}</td>
     <td>${T[i].address}</td>
     <td>
     <button type="button" class="btn btn-danger" onclick='deleteProduct(${T[i].id})'>Delete</button>
     </td>
   </tr> `
     
   } 
   
  
   
  }
  render += ` </tbody>
  </table>`;

  document.getElementById("table").innerHTML = render;
}

/*save Numbers*/
function saveNumber() {
  var number = document.getElementById("number").value; 
  var x = verifNumber(number, 10);
  if (!x) {
    document.getElementById("numberMsg").innerHTML = " Number should be 10 and contain only numbers  !";
    
  } else {
    document.getElementById("numberMsg").innerHTML = "";
  }
  
  if (x) {
    var T = JSON.parse(localStorage.getItem("numbers") || "[]");
    T.push(number);
    localStorage.setItem("numbers", JSON.stringify(T));

 }
 location.reload(1);


} 



function displayNumber() {
  var T = JSON.parse(localStorage.getItem("numbers") || "[]");
var render= `<table class="table" style="width: 30%;" >
<thead class="thead-dark"   >
  <tr>
    <th scope="col">Numbers</th>
    <th scope="col" >Action</th>
    </tr>
    </thead> 
    <tbody>`
    for (let i = 0; i < T.length; i++) {
         render += `
   
        <td>${T[i]}</td>
        <td>
        <button type="button" class="btn btn-danger" onclick='deleteNumber(${T[i]})'>Delete</button>
        </td>
        </tr> `
      }

      render += ` </tbody>
      </table>`;
    
      document.getElementById("tableNumber").innerHTML = render;
}
    

/*Delete number by admin*/
function deleteNumber(number) {
  var T = JSON.parse(localStorage.getItem("numbers") || "[]");
  var index = search(T,number);
  T.splice(index, 1);
  localStorage.setItem("numbers", JSON.stringify(T));
  location.reload();
}
function search(number, T) {
  var index;
  for (var i = 0; i < T.length; i++) {
    if (T[i]== number) {
      index = i;
    }
  }
  return index;
}


  /*Desplay hidding number randomly by admin*/
function displayHideNumber() {
  var T = JSON.parse(localStorage.getItem("numbers") || "[]");
  
  var real_number = 0;
  var hNumber = hideNumber(T[real_number = (Math.floor(Math.random() * 10))]);
 
  document.getElementById("hideNumber").innerHTML = hNumber;
 
  var R = JSON.parse(localStorage.getItem("realNumber") || "[]");
  
  localStorage.setItem("realNumber", JSON.stringify(real_number));


}  

  /*Win of Loose*/
function winOrloose() {
  var i = JSON.parse(localStorage.getItem("attempt") || "1");
  
  
  var numberByuser = document.getElementById("userNumberInput").value;
  var A = JSON.parse(localStorage.getItem("userAttempt") || '[]');
  A.push(numberByuser);
  localStorage.setItem("userAttempt", JSON.stringify(A));
  var T = JSON.parse(localStorage.getItem("numbers") || "[]");
   var R = JSON.parse(localStorage.getItem("realNumber") || "[]");
  


  
  
  if (numberByuser !== T[R] && i < 5) {
   
    document.getElementById("buttonMsg").innerHTML =
      "try againe you got one more chances ";
     }
    
  
  localStorage.setItem("attempt", Number(i) + 1);  
  if (i == 5) {
    document.getElementById("buttonMsg").innerHTML =
  "Noob ! wait for 5min and repeat againe ";
   
  
  document.getElementById("gbutton").disabled = true;
  setTimeout(function() {
    document.getElementById("gbutton").disabled = false;
}, 5000);
  
  }
  
  
  if (numberByuser == T[R] && i<5) {
    
    document.getElementById("buttonMsg").innerHTML = "YOU WON !";
  
}
 









}



 /*Display user attempts */


 function tableAttempts() {
  var A = JSON.parse(localStorage.getItem("userAttempt") || '[]');
 var T = JSON.parse(localStorage.getItem("connectedUser") || "[]");
console.log(T.fName);

var render= `<table class="table" style="width: 30%;" >
<thead class="thead-dark"   >
  <tr>
    <th scope="col">${T.fName}</th>
    <th scope="col" >Attempts</th>
    </tr>
    </thead> 
    <tbody>`
    for (let i = 0; i < A.length; i++) {
      render += `

     <td>${i}</td>
     <td>${A[i]}</td>
     </tr> `
   }

   render += ` </tbody>
   </table>`;
 
   document.getElementById("tableAttempts").innerHTML = render;
}
    














































// Function declaration
function verifLength(ch, n) {
  return ch.length > n;
}
function verifPwd(ch, n) {
  return ch.length >= n;
}
function confirmPwd1(ch1, ch2) {
  return ch1 == ch2;
}
function verifTel(ch) {
  return isNaN(ch);
}
function checkIfEmailExist(email) {
  var i = 0;
  T = JSON.parse(localStorage.getItem("users") || "[]");
  while (i < T.length && T[i].email != email) {
    i++;
  }
  if (i == T.length) {
    return false;
  } else {
    return (T[i].email = email);
  }
}

function checkIfCinExist(cin) {
  var i = 0;
  T = JSON.parse(localStorage.getItem("users") || "[]");
  while (i < T.length && T[i].cin != cin) {
    i++;
  }
  if (i == T.length) {
    return false;
  } else {
    return (T[i].cin = cin);
  }
}

function verifPwdNumber(ch) {
  var res = false;
  for (let i = 0; i < ch.length; i++) {
    if (!isNaN(ch[i])) {
      res = true;
    }
  }
  return res;
}

function verifCity(ch) {
  return ch=='';

}





function verifNumber(ch, n) {
  return (ch.length == n) && (!isNaN(ch)) ;
}


function hideNumber (number){
  var T = [];
  
  for (let i = 0; i < number.length; i++) {
   T[i]=number[i]
  
  }
 var k =0;
   
   T[k=(Math.floor(Math.random() * 10))] = 'X'; 
var s=0;
 
  s=(Math.floor(Math.random() * 10));
 while (s==k){
 s=(Math.floor(Math.random() * 10));
}

  T[s]='X';
var b=0;  
  
  b=(Math.floor(Math.random() * 10));
 while (b==k || b==s){
 b=(Math.floor(Math.random() * 10));
}
 T[b]='X' 
  
  var x = T.join("");
  return x;
  
}
  

