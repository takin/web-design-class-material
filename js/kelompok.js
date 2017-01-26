$(document).ready(() => {

    var button = $('#button').button();
    var totalTeam = $("#totalTeam");
    var numberOfTeam = $('#numOfTeamToPerform');

    button.click((e) => {
        button.button({
            disabled:true
        });
        var count = 0;
        var container = $('#boxContainer');
        var teamToPerform = [];

        container.html('');
        
        var totalTeamValue = totalTeam.val() ? totalTeam.val() : 1;
        var numberOfTeamToPerform = numberOfTeam.val() ? numberOfTeam.val() : 1;
        
        generateTeams(container, totalTeamValue);
        animate(1, function() {
            tic();
        });

        function animate(i, callback) {
            if( i <= totalTeamValue ) {
                setTimeout(() => {
                    $(`#box-${i}`).slideDown({
                        duration:300,
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
                var i = Math.floor(Math.random() * (totalTeamValue - 1 + 1)) + 1;
                
                while( teamToPerform.includes(i)) {
                    i = Math.floor(Math.random() * (totalTeamValue - 1 + 1)) + 1;
                }
                
                let divToHighlight = $(`div#box-${i}`);
                divToHighlight.addClass('selected');
                divToHighlight.removeClass('teamBox');

                if( count < 10) {
                    tac(i);
                } else {
                    if( (teamToPerform.length < numberOfTeamToPerform - 1) && !teamToPerform.includes(i) ||  ( teamToPerform.length <  numberOfTeamToPerform - 1)) {
                        if( (teamToPerform.length < numberOfTeamToPerform - 1) && !teamToPerform.includes(i) ) {
                            teamToPerform.push(i);
                        }
                        count = 0;
                        tic();
                    } else {
                        button.button({
                            disabled:false
                        });
                    }
                } 
            },100);
        }

        function tac(i) {
            setTimeout(() => {
                let divToHighlight = $(`div#box-${i}`);
                divToHighlight.addClass('teamBox')
                divToHighlight.removeClass('selected');
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