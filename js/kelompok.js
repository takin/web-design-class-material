$(document).ready(() => {

    var button = $('#button');

    button.click((e) => {
        e.preventDefault();
        var count = 0;
        var container = $('#boxContainer');
        var teamToPerform = [];

        container.html('');

        var totalTeam = $("#totalTeam").val();
        var numberOfTeamToPerform = $('#numOfTeamToPerform').val();
        
        totalTeam = totalTeam ? totalTeam : 1;
        numberOfTeamToPerform = numberOfTeamToPerform ? numberOfTeamToPerform : 1;
        
        generateTeams(container, totalTeam);
        animate(1, function() {
            tic();
        });

        function animate(i, callback) {
            if( i <= totalTeam ) {
                setTimeout(() => {
                    $(`#box-${i}`).show({
                        duration:500,
                        easing:'easeOutBounce',
                        complete: function() {
                            animate(++i, callback);
                        }
                    });
                },100);
            } else {
                callback.call(this);
            }
        }

        function tic() {
            setTimeout(() => {
                var x = Math.floor(Math.random() * (totalTeam - 1 + 1)) + 1;
                
                while( teamToPerform.includes(x)) {
                    x = Math.floor(Math.random() * (totalTeam - 1 + 1)) + 1;
                }
                
                let divToHighlight = $(`div#box-${x}`);
                divToHighlight.css('background-color','rgba(240,120,140,1)');

                if( count < 10) {
                    tac(x);
                } else {
                    if( (teamToPerform.length < numberOfTeamToPerform - 1) && !teamToPerform.includes(x)  ) {
                        teamToPerform.push(x);
                        tic();
                    } else if( teamToPerform.length < (numberOfTeamToPerform - 1) ) {
                        count = 0;
                        tic();
                    }
                } 
            },100);
        }

        function tac(i) {
            setTimeout(() => {
                let divToHighlight = $(`div#box-${i}`);
                divToHighlight.css('background-color','rgba(240,140,240,.7)');
                count++;
                tic();
            },100);
        }

        function generateTeams(container, numOfTeam, perRows = 4) {

            let numRows = Math.ceil(numOfTeam / perRows);
            var number = 0;

            let containerHeight = numRows * 96; 
            container.animate({
                height:containerHeight
            },1000);

            for( let i = 1; i <= numRows; i++ ) {
                
                let remainder = numOfTeam - number;
                let max = remainder > perRows ? perRows : remainder;

                for(let j = 1; j <= max; j++) {
                    let celDiv = document.createElement('div');
                    number++;
                    celDiv.setAttribute('id',`box-${number}`);
                    celDiv.setAttribute('class','teamBox');
                    
                    if(j == 1) {
                        celDiv.style['margin-left'] = '0px';
                    }

                    if(j == perRows ) {
                        celDiv.style['margin-right'] = '0px';
                    }

                    celDiv.appendChild(document.createTextNode(number));

                    container.append(celDiv);
                }
            }
            return container;
        }
    });


});