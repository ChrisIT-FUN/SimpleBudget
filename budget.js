	  google.charts.load('current', {'packages':['corechart']});
      //google.charts.setOnLoadCallback(drawChart);
	  window.onload = showDivs;
	  
	  function showDivs(){
		  document.getElementById("questionInput").style.display = "inline";
	  }
	  
	  // Draw piechart
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Spending', 'Dollars Per Month'],
          ['Housing',     housing],
          ['Food',      food],
          ['Entertainment',  entertainment],
          ['Necessities', necessities],
          ['Investments and Debts',    investments],
		  ['Savings',    savings]
        ]);

        var options = {
          title: 'Monthly Budget',
		  titleTextStyle: { fontSize: 20}
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
		
		};
		
		// Declare storage variables for storing user input
		var totalIncome, housing, food, entertainment, necessities, investments, savings, totalSpending, input;
		// Declare questions and counter variable used to change question when input is submitted
		var questionCount = 0;
		var questions = ["How much do you spend on housing per month?", 
						"How much do you spend on food per month?",
						"How much do you spend on entertainment per month?", 
						"How much do you spend on necessities per month? (Transportation, insurance, hygiene, etc...)", 
						"How much do you spend on investments and debts per month?"];
						
		var inputData = ["income", "housing", "food", "entertainment", "necessities", "investments"];
		
		// Assign data values from inputData array and calculate savings
		function setValues() {
			totalIncome = inputData[0];
			housing = inputData[1];
			food = inputData[2];
			entertainment = inputData[3];
			necessities = inputData[4];
			investments = inputData[5];
			totalSpending = housing + food + entertainment + necessities + investments;
			savings = totalIncome - totalSpending;
			drawChart();
		};
				
		function validateInput(){
			if (!(isNaN(input) && (input != "")))
			{
			return true;
			}else {
			alert("Form filled out incorrectly. Please enter a number.");
			return false;
			
			}	
		};
		
		function nextQuestion(){
			if (questionCount < 5){
				// Store entered input and change question text	
				input = parseFloat(document.getElementById("inputTxt").value);
				if (validateInput()){					
					inputData[questionCount] = parseFloat(document.getElementById("inputTxt").value);
					document.getElementById("question").innerHTML = questions[questionCount];
					questionCount++;
				}	
			}
			else{
				input = parseFloat(document.getElementById("inputTxt").value);
				if (validateInput()){
				inputData[questionCount] = parseFloat(document.getElementById("inputTxt").value);
				document.getElementById("questionInput").style.display = "none";
				document.getElementById("piechart").style.display = "";
				document.getElementById("recommended").style.display = "inline";
				setValues();	
			}
		}
	}
