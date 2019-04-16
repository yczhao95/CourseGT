        function openForm() {
		  document.getElementById("myForm").style.display = "block";
		  document.getElementById("open-btn").style.display = "none";
		  initChat();
 
		}
		function closeForm() {
		  document.getElementById("myForm").style.display = "none";
		  document.getElementById("open-btn").style.display = "block";
		  
		}

		// set the focus to the input box
		document.getElementById("wisdom").focus();

		// Initialize the Amazon Cognito credentials provider
		AWS.config.region = 'us-east-1'; // Region
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		// Provide your Pool Id here
			IdentityPoolId: 'us-east-1:c5bf34e8-8be7-48a2-8da3-77fc6bc73eff',
		});

		var lexruntime = new AWS.LexRuntime();
		var lexUserId = 'chatbot-demo' + Date.now();
		var sessionAttributes = {};


		function initChat() {
			
			// if there is text to be sent...
			var wisdomText = document.getElementById('wisdom');
			if (wisdomText.value == "" && wisdomText.value.trim().length == 0) {

				// disable input to show we're sending it
				var wisdom = wisdomText.value.trim();

				// send it to the Lex runtime
				var params = {
					botAlias: '$LATEST',
					botName: 'OrderFlowers',
					inputText: wisdom,
					userId: lexUserId,
					sessionAttributes: sessionAttributes
				};
				// showRequest(wisdom);
				lexruntime.postText(params, function(err, data) {
					if (err) {
						console.log(err, err.stack);
						var conversationDiv = document.getElementById('conversation');
						var errorPara = document.createElement("P");
						errorPara.className = 'lexError';
						errorPara.appendChild(document.createTextNode("You can ask me:"));
						errorPara.appendChild(document.createElement('br'));
						errorPara.appendChild(document.createTextNode("• What is this app"));
						errorPara.appendChild(document.createElement('br'));
						errorPara.appendChild(document.createTextNode("• Functions of this app"));
						errorPara.appendChild(document.createElement('br'));
						errorPara.appendChild(document.createTextNode("• How to publish a review"));
						errorPara.appendChild(document.createElement('br'));
						errorPara.appendChild(document.createTextNode("• Contact us"));
						conversationDiv.appendChild(errorPara);
						conversationDiv.scrollTop = conversationDiv.scrollHeight;
					}
					if (data) {
						// capture the sessionAttributes for the next cycle
						sessionAttributes = data.sessionAttributes;
						// show response and/or error/dialog status
						showResponse(data);
					}
				});
			}
			return false;
		}


		function pushChat() {

			// if there is text to be sent...
			var wisdomText = document.getElementById('wisdom');
			if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {

				// disable input to show we're sending it
				var wisdom = wisdomText.value.trim();
				wisdomText.value = '...';
				wisdomText.locked = true;

				// send it to the Lex runtime
				var params = {
					botAlias: '$LATEST',
					botName: 'OrderFlowers',
					inputText: wisdom,
					userId: lexUserId,
					sessionAttributes: sessionAttributes
				};
				showRequest(wisdom);
				lexruntime.postText(params, function(err, data) {
					if (err) {
						console.log(err, err.stack);
						// showError('Error:  ' + err.message + ' (see console for details)')
						showError("Sorry I don't understand what you said.")
					}
					if (data) {
						// capture the sessionAttributes for the next cycle
						sessionAttributes = data.sessionAttributes;
						// show response and/or error/dialog status
						showResponse(data);
					}
					// re-enable input
					wisdomText.value = '';
					wisdomText.locked = false;
				});
			}
			// we always cancel form submission
			return false;
		}

		function showRequest(daText) {

			var conversationDiv = document.getElementById('conversation');
			var requestPara = document.createElement("P");
			requestPara.className = 'userRequest';
			requestPara.appendChild(document.createTextNode(daText));
			conversationDiv.appendChild(requestPara);
			conversationDiv.scrollTop = conversationDiv.scrollHeight;
		}

		function showError(daText) {

			var conversationDiv = document.getElementById('conversation');
			var errorPara = document.createElement("P");
			errorPara.className = 'lexError';
			errorPara.appendChild(document.createTextNode(daText));
			conversationDiv.appendChild(errorPara);
			conversationDiv.scrollTop = conversationDiv.scrollHeight;
		}

		function showResponse(lexResponse) {

			var conversationDiv = document.getElementById('conversation');
			var responsePara = document.createElement("P");
			responsePara.className = 'lexResponse';
			if (lexResponse.message) {
				responsePara.appendChild(document.createTextNode(lexResponse.message));
				responsePara.appendChild(document.createElement('br'));
			}
			if (lexResponse.dialogState === 'ReadyForFulfillment') {
				responsePara.appendChild(document.createTextNode(
					'Ready for fulfillment'));
				// TODO:  show slot values
			}
			conversationDiv.appendChild(responsePara);
			conversationDiv.scrollTop = conversationDiv.scrollHeight;
		}