document.querySelector("form").addEventListener("submit",function(e){
    e.preventDefault();
    
    const Weight=parseFloat(document.getElementById("weight").value);
    const heightcm=parseFloat(document.getElementById("Height").value);
    const age=parseInt(document.getElementById("age").value);

    if(isNaN(Weight) || isNaN(heightcm) || isNaN(age))
    {
        alert("Please enter all values correctly.");
        return ;
    }

   const heightM=heightcm/100;
   const bmi= Weight / (heightM*heightM) ;
   let resultText=(`Your BMI is ${bmi.toFixed(2)}-`);

   if(bmi<18.5)  resultText+="UnderWeight";
   else if(bmi<25) resultText+="Normal (Fit)";
   else if(bmi<30) resultText+="OverWeight";
   else resultText+="Obese";

   let resultBox=document.getElementById("result");
   if(!resultBox)
   {
    resultBox=document.createElement("div")
    resultBox.id = "result";
    resultBox.style.marginTop = "20px";
    document.querySelector("form").appendChild(resultBox);
  }
  resultBox.textContent = resultText;
  resultBox.style.fontWeight = "bold";
  resultBox.style.color = "#222";
});