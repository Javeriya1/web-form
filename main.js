// Document is ready
$(document).ready(function () {
	$(".loader").hide();
	// Validate Username
	$("#usercheck").hide();
	var usernameError = true;
	$("#fname").on('keydown', function (e) {
		var usernameValue = $("#fname").val().trim();
		// Check if you already have 50 characters (but allow 'backspace' and 'del' keys).
		if (e.keyCode != 8 && e.keyCode != 46 && $("#fname").val().length >= 50) {
			return false; // This will make the new character to be ignored.
		}

	});

	//validate email
	$("#emailcheck").hide();
	var useremailError = true;
	$("#email").keyup(function () {
		validateEmail();
	});

	$("#phonecheck").hide();
	var userphoneError = true;
	$("#phone").each(function () {
		$(this).on("change keyup paste", function (e) {
			var output,
				$this = $(this),
				input = $this.val();

			if (e.keyCode != 8) {

				input = input.replace(/[^0-9]/g, '');
				var area = input.substr(0, 3);
				var pre = input.substr(3, 3);
				var tel = input.substr(6, 4);
				if (area.length < 3) {
					output = "(" + area;
				} else if (area.length == 3 && pre.length < 3) {
					output = "(" + area + ")" + " " + pre;
				} else if (area.length == 3 && pre.length == 3) {
					output = "(" + area + ")" + " " + pre + "-" + tel;
				}
				$this.val(output);

			}
			var phoneValue = $("#phone").val();
			validatePhone(phoneValue);
		});
	});

	//validate registration number
	$("#regcheck").hide();
	var userregError = true;
	$("#reg").keyup(function () {
		validateRegistration();
	});

	//get cookie
	var userCheckboxError = true
	if (document.cookie == "") {
		// console.log("no cookies found");

	} else {
		usernameError = false;
		useremailError = false;
		var allCookie = document.cookie.split(';');
		let nameSplit = allCookie[0]
		let emailSplit = allCookie[1]

		let nameSplit1 = nameSplit.split("=")
		let emailsplit1 = emailSplit.split("=")

		$("#fname").val(nameSplit1[1])
		$("#email").val(emailsplit1[1])

	}

	//validate image

	function checkForEnable() {
		$("#result").hide();
		if (!usernameError && !useremailError && !userregError && !userCheckboxError && !imageUploadDoneError && !userphoneError) {
			enableButton()

		} else {
			disableButton()
		}
	}
	//username
	function validateUsername() {
		var re = /[A-Za-z]+/;
		var usernameValue = $("#fname").val().trim();
		// console.log(usernameValue.length)
		if (usernameValue.length == 0) {
			$("#fname").css("border", "1px solid red");
			$("#usercheck").html("**Username missing");
			$("#usercheck").show();
			usernameError = true;
		} else if (usernameValue.length < 3) {
			$("#fname").css("border", "1px solid lightgrey");
			$("#usercheck").show();
			$("#usercheck").html("**Length of Username must be more than 3 characters");
			usernameError = true;

		} else if (!re.test($("#fname").val())) {
			$("#fname").css("border", "1px solid red");
			$("#usercheck").html("**Please enter Characters only");
			$("#usercheck").show();
			usernameError = true;

		} else {
			$("#fname").css("border", "1px solid lightgrey");
			$("#usercheck").hide();
			usernameError = false;

		}
		checkForEnable()

	}

	//email
	function validateEmail() {
		var useremailValue = $("#email").val().trim();

		// var reg = /^[^ ]+@[^]$/;
		var reg = /^[^ ]+@[^ ]+\.[a-z]{1,10}$/;
		if (useremailValue.length == 0) {
			$("#email").css("border", "1px solid red");
			$("#emailcheck").html("**Email address missing");
			$("#emailcheck").show();
			useremailError = true;
		} else if (reg.test(useremailValue)) {
			$("#email").css("border", "1px solid lightgrey");
			$("#emailcheck").hide();
			useremailError = false;


		} else {
			$("#email").css("border", "1px solid red");
			$("#emailcheck").show();

			$("#emailcheck").html("**Please enter valid email");
			useremailError = true;

		}
		checkForEnable()

	}

	//phone
	function validatePhone(str) {

		var phoneValue = $("#phone").val();
		var a = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s){1,1}?(\d{3})(\-|\s){1,1}?(\d{4})$/.test(str);
		// var a=/^\(?([0-9]{3})\)?(\-|\s){1,1}?([0-9]{3})?(\-|\s){1,1}?([0-9]{4})$/.test(str);
		var re = /[A-Za-z]+/;
		var maxlength = 14;

		if (phoneValue.length == 0) {
			$("#phone").css("border", "1px solid red");
			$("#phonecheck").html("**Phone number missing");
			$("#phonecheck").show();
			userphoneError = true;
		} else if (re.test(str.trim())) {
			$("#phone").css("border", "1px solid red");
			$("#phonecheck").html("**allow only numbers");
			$("#phonecheck").show();
			userphoneError = true;
		} else if (a == false) {

			$("#phone").css("border", "1px solid red");
			$("#phonecheck").html("**Please enter the correct phone number");
			$("#phonecheck").show();
			userphoneError = true;
		} else {
			$("#phone").css("border", "1px solid lightgrey");
			$("#phonecheck").hide();
			userphoneError = false;
		}
		checkForEnable()
	}

	//validate registration number
	function validateRegistration() {
		var regValue = $("#reg").val().trim();
		var re = /[!@#$%^&*()?<>:.,{}|/\-=+_;"'`~\\[\]]+/;

		if (regValue.length == 0) {
			$("#reg").css("border", "1px solid red");
			$("#regcheck").html("****Registration number missing");
			$("#regcheck").show();
			userregError = true;

		} else if (regValue.indexOf(' ') >= 0) {

			$("#reg").css("border", "1px solid red");
			$("#regcheck").html("**Please enter the correct Registration number");
			$("#regcheck").show();
			userregError = true;
		} else if (re.test($("#reg").val().trim())) {
			$("#reg").css("border", "1px solid red");
			$("#regcheck").html("**Please enter Numeric values only");
			$("#regcheck").show();
			userregError = true;
		} else {
			$("#reg").css("border", "1px solid lightgrey");
			$("#regcheck").hide();
			userregError = false;
		}
		checkForEnable()
	}

	function enableButton() {
		$("#mybtn").prop("disabled", false); // enable the submit button
		$("#mybtn").css({ opacity: "1" }); // make the submit button look enabled
	}

	function disableButton() {
		$("#mybtn").prop("disabled", true); // disable the submit button
		$("#mybtn").css({ opacity: "0.5" }); // make the submit button look dsiabled
	}

	//for Image
	var pic;
	var imageUploadDoneError = true
	document
		.getElementById("fileUpload")
		.addEventListener("change", ImageSelection);

	function ImageSelection(e) {
		var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

		if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
			return;
		}

		pic = e.target.value;
		// console.log(pic);
		if (pic != undefined) {

			let str1 = pic.slice(12, 25);
			let str2 = pic.slice(pic.length - 8);

			console.log("pic" + pic)
			var imgSize = e.target.files[0].size / (1024 * 1024);
			console.log(imgSize);
			if (imgSize <= 10 && pic != "") {

				$("#fileSelected").html(str1 + '...' + str2);

				imageUploadDoneError = false
				$("#uploading").hide();

				checkForEnable();
			} else {

				$("#fileSelected").html(pic);
				$("#uploading").html("Photo size is too large");
				$("#uploading").css("color", "red");
				$("#uploading").show();

				imageUploadDoneError = true
				checkForEnable();

			}
		}
	}
	//validate all fields length
	function InputCheck() {
		var x = document.getElementById("check").checked;
		var age1 = document.getElementById("age1").checked;
		var age2 = document.getElementById("age2").checked;

		if (
			(x == true) &&
			(age1 == true || age2 == true)
		) {
			return false

		} else {
			return true;
		}
	}

	//for checkbox and radio button
	$("#memoForm").click("input", () => {
		if (!InputCheck()) {
			userCheckboxError = false
		}
		else {
			userCheckboxError = true
		}
		checkForEnable()
	});

	// create blur event

	$("input").blur(function (event) {
		if (event.target.value.length == 0) {
			event.target.style.borderColor = "red";
			validateUsername();

		} else {
			validateUsername();
			event.target.style.borderColor = "lightgrey";


		}
	});

	//store data in firebase

	function storeDataInFirebase() {
		//EST
		offset = -4.0;

		clientDate = new Date();
		utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);

		serverDate = new Date(utc + (3600000 * offset));

		var FirstName = $("#fname").val();
		var Email = $("#email").val();
		var Phone = $("#phone").val();
		var Registration_Number = $("#reg").val();
		var perchWinner = 0;
		var generalWinner = 0;
		var Age_Above_Sixteen = !document.getElementById("age1").checked;
		var currentDate = new Date();
		var dateInFormat = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
		var userObject = {
			FirstName: FirstName,
			Email: Email,
			Phone: Phone,
			Registration_Number: Registration_Number,
			date: serverDate.getTime(),
			perchWinner: perchWinner,
			generalWinner: generalWinner,
			Age_Above_Sixteen: Age_Above_Sixteen
		};


		db.collection("Timings").doc("Timing").get().then(snapshot => {
			var timeFromDatabase;
			var snap = snapshot.data()
			timeFromDatabase = new Date(currentDate.getFullYear(), (currentDate.getMonth()), currentDate.getDate(), snap.time, 0, 0)
			if (currentDate.getTime() <= timeFromDatabase.getTime()) {

				var image = document.getElementById("fileUpload").files[0];
				var imageName = image.name;
				var size = parseFloat(image.size / 1024).toFixed(2);
				alert(size);
				var storageRef = storage.ref("images/" + imageName);
				var uploadTask = storageRef.put(image);
				db.collection("UserList").doc(dateInFormat).get().then((snapshot1) => {
					if (snapshot1.data() != undefined) {
						var snap1 = snapshot1.data();
						var RegId = Object.keys(snap1)
						if (RegId.includes(Registration_Number)) {

							if (userregError == false) {
								$(".loader").hide();
								$("#result").html("Only one submission per day per registration.");
								$('#result').css({ "color": "red", "text-align": "center", "display": "block" })
								$("#result").show();
								$("#usercheck").html("User already exist");
								$("#usercheck").css("color", "red")
								$("#usercheck").show()
							}
						}
						else {
							alert("else");
							uploadTask.on(
								"state_changed",
								function (snapshot) {
									var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
									console.log(progress);

									uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {


										userObject["URL"] = downloadURL;
										$("#uplaoding").html('uploading ' + progress + "%");
										$("#uplaoding").css("color", "green");
										db.collection("UserList").doc(dateInFormat).get().then(snapData => {
											alert("387");
											if (snapData.data() != undefined) {
												alert("389");
												db.collection("UserList").doc(dateInFormat).update({
													[Registration_Number]: userObject

												}).then(() => {
													document.cookie = "name=" + userObject.FirstName;
													document.cookie = "email=" + userObject.Email;
													var date = new Date();
													date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
													document.cookie = "expires=" + date + ";"
													$(".loader").hide();
													alert("storing the data to firebase0")
													window.location.href = "thankyouPage.html";
													$("#memoForm").trigger("reset");

												}).catch(error =>{
													alert(error);
													console.log(error);
												}) 

											} else {
												alert("410");
												db.collection("UserList").doc(dateInFormat).set({
													[Registration_Number]: userObject

												}).then(() => {
													alert("415");
													document.cookie = "name=" + userObject.FirstName;
													document.cookie = "email=" + userObject.Email;
													var date = new Date();
													date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
													document.cookie = "expires=" + date + ";"
													$(".loader").hide();
                                                    alert("storing the data to firebase1")
													window.location.href = "thankyouPage.html";
													$("#memoForm").trigger("reset");

												}).catch(error =>{
													alert(error);
													console.log(error);
												}) 
											}
										}).catch(error =>{
											alert(error);
											console.log(error);
										}) 
									}
									);
								}

							)

						}



					} else {
						uploadTask.on(
							"state_changed",
							function (snapshot) {
								var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

								uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
									// console.log(downloadURL);

									userObject["URL"] = downloadURL;
									$("#uplaoding").html('uploading ' + progress + "%");
									$("#uplaoding").css("color", "green");
									db.collection("UserList").doc(dateInFormat).get().then(snapData => {
										db.collection("UserList").doc(dateInFormat).set({
											[Registration_Number]: userObject

										}).then(() => {
											document.cookie = "name=" + userObject.FirstName;
											document.cookie = "email=" + userObject.Email;
											var date = new Date();
											date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
											document.cookie = "expires=" + date + ";"
											$(".loader").hide();
                                            alert("storing the data to firebase2")
											window.location.href = "thankyouPage.html";
											$("#memoForm").trigger("reset");
										}).catch(error =>{
											alert(error);
											console.log(error);
										}) 
									})
								}
								);
							}

						)

					}
				})
			}
			else {
				$(".loader").hide();
				$('#result').html("Timeout for the day")

				$('#result').css({ "color": "red", "text-align": "center", "display": "block" })
				$('#result').show()
			}
		}).catch(error =>{
			alert(error);
			console.log(error);
		}) 
	}


	// Submitt button
	$("#mybtn").click(function (e) {
		e.preventDefault();
		$(".loader").show();
		storeDataInFirebase();
	});
});