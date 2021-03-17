
// Document is ready

$(document).ready(function () {


  // Validate Username
  $("#usercheck").hide();
  var usernameError = true;
  $("#fname").keyup(function () {
    validateUsername();
  });
  // Validate UserLastname
  // $('#userchecks').hide();
  // var userlastnameError = true;
  // $('#lname').keyup(function () {
  //  validateUserLastname();

  // });
  //validate address
  $("#addr").hide();
  var useraddrError = true;
  $("#address").keyup(function () {
    validateAddress();
  });

  //validate email
  $("#emailcheck").hide();
  var useremailError = true;
  $("#email").keyup(function () {
    validateEmail();
  });

  //validate phone
  $("#phonecheck").hide();
  var userphoneError = true;
  $("#phone").keyup(function () {
    validatePhone();
  });

  //validate captcha
  // $('#text').keyup(function () {
  //   validateCaptcha();

  //  });

  //username
  function validateUsername() {
    var usernameValue = $("#fname").val();
    if (usernameValue.length == "") {
      $("#fname").css("border", "1px solid red");
      $("#usercheck").html("**username missing");
      $("#usercheck").show();
      usernameError = false;
      return false;
    } else if (usernameValue.length < 3 || usernameValue.length > 10) {
      $("#fname").css("border", "1px solid lightgrey");
      $("#usercheck").show();
      $("#usercheck").html("**length of username must be between 3 and 10");
      usernameError = false;
      return false;
    } else {
      $("#usercheck").hide();
    }
  }

  //user last name
  // function validateUserLastname(){
  //   var userlastnameValue = $('#lname').val();
  //   if((userlastnameValue.length < 1)||
  //   (userlastnameValue.length > 15)) {
  //     $('#lname').css("border","1px solid red")
  // $('#userchecks').show();
  // $('#userchecks').html
  // ("length of lastname must be between 1 and 15");
  // userlastnameError = false;
  // return false;
  // }
  // else {
  //   $('#lname').css("border","1px solid lightgrey")
  // $('#userchecks').hide();
  // }
  // }

  //email
  function validateEmail() {
    var useremailValue = $("#email").val();
    // var reg = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
    var reg = /^[^ ]+@[^ ]+\.[a-z]{3,3}$/;
    if (useremailValue.length == "") {
      $("#email").css("border", "1px solid red");
      $("#emailcheck").html("**email missing");
      $("#emailcheck").show();
      useremailError = false;
      return false;
    } else if (reg.test(useremailValue)) {
      $("#email").css("border", "1px solid lightgrey");
      $("#emailcheck").hide();
    } else {
      $("#email").css("border", "1px solid red");
      $("#emailcheck").show();

      $("#emailcheck").html("**please enter valid email");
      useremailError = false;
      return false;
    }
  }

  //phone
  function validatePhone() {
    var phoneValue = $("#phone").val();
    if (phoneValue.length == "") {
      $("#phone").css("border", "1px solid red");
      $("#phonecheck").html("**phone number missing");
      $("#phonecheck").show();
      userphoneError = false;
      return false;
    } else {
      $("#phone").usPhoneFormat({
        format: "(xxx) xxx-xxxx",
      });
      $("#phone").css("border", "1px solid lightgrey");
      $("#phonecheck").hide();
    }
  }

  //address
  function validateAddress() {
    var addressValue = $("#address").val();
    if (addressValue.length == "") {
      $("#address").css("border", "1px solid red");
      $("#addr").html("**address is missing");
      $("#addr").show();
      useraddrError = false;
      return false;
    } else {
      $("#address").css("border", "1px solid lightgrey");
      $("#addr").hide();
    }
  }

  //captcha

  var sum;
  let data1 = Math.round(10 * Math.random());
  let data2 = Math.round(10 * Math.random());
  let str = ` ${data1}+${data2}=?`;
  $("#captcha").html(str);

  $("#captcha").css({
    "font-size": "200%",
    "font-weight": "bold",
    "text-align": "center",
  });
  sum = data1 + data2;
  $("#texts").keyup(function () {
    validateCaptcha();
  });

  function validateCaptcha() {
    var textValue = $("#texts").val();
    
    if (textValue == sum) {
      $("#captchacheck").html("valid").fadeOut(2000)
      $("#captchacheck").css("color","green")
    } else {
      $("#captchacheck").html("Invalid")
      $("#captchacheck").css("color","red");
    }
  }

  function enableButton(){
    $("#mybtn").prop("disabled", false); // enable the submit button
    $("#mybtn").css({"opacity":"1"}); // make the submit button look enabled
}

function disableButton(){
    $("#mybtn").prop("disabled", true); // disable the submit button
    $("#mybtn").css({"opacity":"0.5"}); // make the submit button look dsiabled
}

  

  
  

  //   Add the data to firebase

function storeData() {
  //get values
  var FirstName = $("#fname").val();
  var LastName = $("#lname").val();
  var Email = $("#email").val();
  var Phone =$("#phone").val();
  var Address = $("#address").val();
  db.collection("users")
    .doc()
    .set({
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Phone: Phone,
      Address: Address,
     
    })
    
    .then(() => {
      console.log("document written successfully");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

//validate all fields length
$("#memoForm").click('input',()=>{
  x=(document.getElementById('check').checked)
  y=(document.getElementById('checks').checked)

  if(fname.value.length>0 && email.value.length>0 && phone.value.length>0 && address.value.length>0 && texts.value.length>0 &&x==true && y==true ){
    enableButton();
  }
  else{
   disableButton();
  }
})

// create blur event

$("input").blur(function(event){
  if(event.target.value.length==0){
        event.target.style.borderColor="red"
        }
        else{
          event.target.style.borderColor="lightgrey"
        }
      }
);
    

// Submitt button
$("#mybtn").click(function (e) {
    e.preventDefault();
    // disableButton(); // disable button for making it not tappable multiple times.
  
  // var x=$("input[type='checkbox']:checked");
  // if(x.length==2){
  //   storeData();
  //   $("#result").html ("Thank You").fadeOut(2000); 
  //   $("#result").css({"color":"green","margin-bottom":"10px","font-size":"20px" ,"font-weight":"bold", "text-align":"center"}) 
  //   $("#memoForm").trigger("reset");
  // }

  // else{ 
  //   $("#result").html("Please select the options before submit the form")
  //   $("#result").css({"color":"red","margin-bottom":"10px"})
  // }
  

  if ((usernameError == true) &&(useremailError== true)&&(userphoneError == true)&&(useraddrError== true)){
    alert("please make sure all fields entered properly")
    return true;
  } 
  else {
    storeData();
    
    $("#result").html ("Thank You").fadeOut(2000); 
    $("#result").css({"color":"green","margin-bottom":"10px","font-size":"20px" ,"font-weight":"bold", "text-align":"center"}) 
    $("#memoForm").trigger("reset");
    // window.location.reload();
    // $("#memoForm").trigger("reset");
   
  }
});
});
 
  



