'use strict';

var args = process.argv;
var keys = args.keys();
var options = {};
var urutan = ["pertama","kedua","ketiga","keempat","kelima","keenam","ketujuh","kedelapan","kesembilan","kesepuluh"];

if( args.length < 4) {
    console.log('anda belum memasukkan jumlah total kelompok dan jumlah kelompok yang akan maju');
    process.exit();
} else {
    var arg1 = args[2].split('=');
    var arg2 = args[3].split('=');
    options[arg1[0]] = parseInt(arg1[1]);
    options[arg2[0]] = parseInt(arg2[1]);

    var keys = Object.keys(options);

    console.log('persiapan pengundian kelompok yang akan maju presentasi....');
    createKelompok([],options[keys[keys.indexOf('--total-kelompok')]], options[keys[keys.indexOf('--jumlah-yang-akan-maju')]]);

}
function createKelompok(kelompokYangAkanMaju, totalTeams, teamsToPerform) {

    if( kelompokYangAkanMaju.length < teamsToPerform ) {
        setTimeout(() => {

                var kelompok = Math.floor((Math.random() * (totalTeams - 1) + 1));

                if( !kelompokYangAkanMaju.includes(kelompok) ) {
                    kelompokYangAkanMaju.push(kelompok);
                    console.log(`kelompok ${urutan[kelompokYangAkanMaju.length - 1]} adalah: kelompok ${kelompok}`);
                }
                createKelompok(kelompokYangAkanMaju, totalTeams,teamsToPerform);
        },2000);
    } else {
        console.log('selesai...');
        setTimeout(() => {
            process.exit();
        },1000);
    }
}

