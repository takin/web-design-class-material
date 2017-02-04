$(document).ready(() => {

    const SHOW_TEAM_BOX_EASING = 'easeOutBounce';
    const BOX_CONTAINER_HEIGHT_EASING = 'easeOutQuart';
    const BOX_HOVER_CSS_CLASS = 'hover';
    const BOX_SELECTED_CSS_CLASS = 'selected';
    const BOX_DEFAULT_CSS_CLASS = 'teamBox';

    const NUMBER_OF_RANDOM_SELECT_ITERATION = 5;

    const DEFAULT_TEAM_BOX_HEIGHT = 96;

    const DELAY_BETWEEN_TEAM_BOX_SHOW = 100;
    const TEAM_BOX_SHOW_ANIMATION_SPEED = 300;
    const TEAM_BOX_CONTAINER_ANIMATION_SPEED = 800;
    const TEAM_BOX_SELECT_DELAY = 100;
    const TEAM_BOX_UNSELECT_DELAY = 100;

    const button = $('#button').button();
    const totalTeam = $("#totalTeam");
    const numberOfTeam = $('#numOfTeamToPerform');
    const container = $('#boxContainer');


    button.click((e) => {

        let totalTeamValue = parseInt(totalTeam.val());
        let numberOfTeamToPerform = parseInt(numberOfTeam.val());
        if( totalTeamValue > numberOfTeamToPerform ){
            button.button({
                disabled:true
            });
            container.html('');

            generateTeamsBox(container, totalTeamValue, 4, () => { 
                showTeamBox(1, totalTeamValue, () =>  {
                    selectTeamBox(0,totalTeamValue, [], numberOfTeamToPerform, () => {
                        button.button( { disabled:false } );
                    });
                });
            });
        }
    });

    function showTeamBox(lastIteration, totalTeamValue, done) {

        if( lastIteration > totalTeamValue ) {
            if( typeof(done) === 'function' ) {
                done();
            }
            return true;
        }
        
        setTimeout(() => {
            $(`#box-${lastIteration}`).slideDown({
                duration:TEAM_BOX_SHOW_ANIMATION_SPEED,
                easing: SHOW_TEAM_BOX_EASING,
                complete: function() {
                    showTeamBox(++lastIteration, totalTeamValue, done);
                }
            });
        },DELAY_BETWEEN_TEAM_BOX_SHOW);
    }

    function generateRandomNumber(min, max) {
        let randomNumber = Math.floor(Math.random() * (max - min + min)) + 1;
        return randomNumber;
    }

    function selectTeamBox(count, totalTeamValue, arrayOfTeamsToPerform, numberOfTeamToPerform, done) {
        setTimeout(() => {
            var teamNumber = generateRandomNumber(1, totalTeamValue);
            while( arrayOfTeamsToPerform.includes(teamNumber)) {
                teamNumber = generateRandomNumber(1,totalTeamValue);
            }
            
            let divToHighlight = $(`div#box-${teamNumber}`);

            divToHighlight.addClass(BOX_SELECTED_CSS_CLASS);
            divToHighlight.removeClass(BOX_DEFAULT_CSS_CLASS);

            if( count < NUMBER_OF_RANDOM_SELECT_ITERATION) {
                unselectTeamBox(teamNumber, totalTeamValue, arrayOfTeamsToPerform, numberOfTeamToPerform, count, done);
            } else {
                arrayOfTeamsToPerform.push(teamNumber);
                if( arrayOfTeamsToPerform.length <= numberOfTeamToPerform ) {
                    if( arrayOfTeamsToPerform.length < numberOfTeamToPerform ) {
                        selectTeamBox(0, totalTeamValue, arrayOfTeamsToPerform, numberOfTeamToPerform, done);
                    }

                    divToHighlight.addClass(BOX_SELECTED_CSS_CLASS, 1500);
                    
                    if( arrayOfTeamsToPerform.length == numberOfTeamToPerform ) {
                        done();
                    }
                }
            }
        },TEAM_BOX_SELECT_DELAY);
    }

    function unselectTeamBox(currentTeamNumber, totalTeamValue, arrayOfTeamsToPerform, numberOfTeamToPerform, count, done) {
        setTimeout(() => {
            let divToHighlight = $(`div#box-${currentTeamNumber}`);
            divToHighlight.addClass(BOX_DEFAULT_CSS_CLASS)
            divToHighlight.removeClass(BOX_SELECTED_CSS_CLASS);
            count++;
            selectTeamBox(count, totalTeamValue, arrayOfTeamsToPerform, numberOfTeamToPerform, done);
        },TEAM_BOX_UNSELECT_DELAY);
    }

    function generateTeamsBox(container, numOfTeam, perRows = 4, done) {

        let numRows = Math.ceil(numOfTeam / perRows);
        var number = 0;

        let containerHeight = numRows * DEFAULT_TEAM_BOX_HEIGHT; 
        container.animate({
            height:containerHeight
        },TEAM_BOX_CONTAINER_ANIMATION_SPEED, BOX_CONTAINER_HEIGHT_EASING);

        for( let i = 1; i <= numRows; i++ ) {
            
            let remainder = numOfTeam - number;
            let max = remainder > perRows ? perRows : remainder;

            for(let j = 1; j <= max; j++) {
                number++;
                
                let celDiv = document.createElement('div');
                
                celDiv.setAttribute('id',`box-${number}`);
                celDiv.setAttribute('class',BOX_DEFAULT_CSS_CLASS);
                
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

        if( typeof(done) === 'function' ) {
            return done.call(this,container);
        }
        return container;
    }
});