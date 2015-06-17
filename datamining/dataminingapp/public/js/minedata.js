var inputData = null; 

/*
* Makes a request to the server based on the @param code and calls
* render data to display the response in the data-table element. 
* 
* Also stores the data from server in a global that can accessed later. 
*   - this is not ideal...sigh...the deities of programming are crying.
*/
function loadData(code){

    var xmlhttp = new XMLHttpRequest();

    if(code){
        xmlhttp.open("GET",hostaddr+"/data/"+code, true);
        xmlhttp.send(); 
        xmlhttp.onreadystatechange = function () {
            var DONE = this.DONE || 4;
            if (this.readyState === DONE){
                try{

                    console.log("server responded with: "+ xmlhttp.status );

                    if( xmlhttp.status === 200 ){
                        var data = JSON.parse(this.response); 
                        if( data.length > 0){

                            inputData = data[0]; 
                            $("#invalid-code-message").hide();
                            renderData(data[0]);

                        }else{

                            $("#invalid-code-message").show();

                        }

                    }else{

                        $("#invalid-code-message").show();

                    }
                }catch(e){
                    console.log(e); 
                }
            }
        };
    }

}

/*
* uses a naive bayes method on the previous inputData
* (stored in global variable) and the parameters of this 
* method to predict the class of the input tuple.
*/
function mineData(val1, val2, val3){

    //1. Find all possible classes. 

    var inputs = [
        { name : "attr1", value : val1, givens : {} },
        { name : "attr2", value : val2, givens : {} },
        { name : "attr3", value : val3, givens : {} },
   ];

    var classes = []; 

    for(var i = 0; i < inputData.length; i++){

        //check if this value is already in the classes list.
        if(classes.indexOf(inputData[i].data['class'].toLowerCase()) == -1){

            classes.push( inputData[i].data['class'].toLowerCase() );

        } 
    }


    console.log("classes: "+JSON.stringify(classes)); 

   //2. Find probability of each class: 

    var count = 1; 

    for(var i = 0; i < classes.length; i++){

        count = 0;
        for(var j = 0; j < inputData.length; j++){

            if(inputData[j].data['class'].toLowerCase() === classes[i]){

                count += 1; 

            }
        }

        classes[i] = {name : classes[i]}; 
        classes[i].count = count; 
        classes[i].pc = (classes[i].count + 1) / (inputData.length + classes.length );
    }

    console.log("classes: "+JSON.stringify(classes)); 

    //3. find the probability of each input GIVEN each class:

    var vals = [];

    for( var i = 0; i < inputs.length; i++ ){


        for( var j = 0; j < classes.length; j++ ){

            count = 0; 

            vals = [];

            for( var k = 0; k < inputData.length; k++ ){

                if( vals.indexOf(inputData[k].data[inputs[i].name].toLowerCase()) === -1 ){

                    vals.push(inputData[k].data[inputs[i].name].toLowerCase());

                }

                if(inputData[k].data['class'].toLowerCase() === classes[j].name){

                    if(inputData[k].data[inputs[i].name].toLowerCase() === inputs[i].value){

                        count += 1;

                    }
                }
            }

            inputs[i].givens[classes[j].name] = (count + 1)/ ( classes[j].count+vals.length);

        }
    }

    console.log(JSON.stringify(inputs)); 

    //4. Compute the probability for each class using bayes rule:
    //  P(C | v1, v2, v3) = P(v1|C)*P(v2|C)*P(v3|C)*(P(C)

    var tmp = 1; 
    var partial_sum = 0; 

    for( var j = 0; j < classes.length; j++ ){

        tmp = 1; 

        tmp = tmp * inputs[0].givens[classes[j].name]; 
        tmp = tmp * inputs[1].givens[classes[j].name]; 
        tmp = tmp * inputs[2].givens[classes[j].name]; 

        classes[j].partial = tmp * classes[j].pc
        partial_sum += classes[j].partial; 
    }

    //5. Normalize results: 

    var alpha = 1 / partial_sum; 

    for( var j = 0; j < classes.length; j++ ){

        classes[j].total = alpha*classes[j].partial;

    }

    console.log(JSON.stringify(classes));



    return [classes, inputs];
}

/*
* Populates the data-table element with data from the server. 
*/
function renderData(data){

    console.log("renderData(%s)", JSON.stringify(data)); 

    var s = ""; 

    var elem = $("#data-table");

    elem.text(''); 

    console.log(data); 

    if(data.length <= 0){

        console.log("INVALID CODE");

        $("#invalid-code-message").show();

    }else{
        for(var i = 0; i < data.length; i++){

            s = ""; 
            s += "<tr>"; 
            s += "<td ><input disabled='disabled' value='"+data[i].data.attr1+"' readonly='true'/></td>"; 
            s += "<td ><input disabled='disabled' value='"+data[i].data.attr2+"' readonly='true'/></td>"; 
            s += "<td ><input disabled='disabled' value='"+data[i].data.attr3+"' readonly='true'/></td>"; 
            s += "<td ><input disabled='disabled' value='"+data[i].data['class']+"' readonly='true'/></td>"; 
            s += "</tr>"; 

            elem.append(s); 
        }


        $("#classifier-wrapper").show();
        $("#data-wrapper").show();

        $("#bumper").css("height", "15%");
    }
}
