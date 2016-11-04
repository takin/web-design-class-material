// ES6 atau ES2015
class Mahasiswa {

    constructor(dataMahasiswa) {
        this.dataMahasiswa = dataMahasiswa;
    }

    sayHello() {
        console.log("Hello " + this.dataMahasiswa.nama);
    }
}

function MahasiswaES5(data) {
    this.dataMahasiswa = data;

    this.sayHello = function() {
        console.log("Hello " + this.dataMahasiswa.nama);
    };
}

var data = {
    nama:"Syamsul",
    alamat:{
        desa:"Kumbang",
        kecamatan:"Masbagik",
        kabupaten:"Lombok Timur"
    },
    hobi:[
        {
            peralatan:"Raket",
            nama:"Badminton"
        },
        {
            perlatan:"Kaca mata",
            nama:"Renang"
        }
    ]
}; 


var mhsClass = new Mahasiswa(data);
var mhsProto = new MahasiswaES5(data);

console.log(mhsClass.sayHello());
console.log(mhsProto.sayHello());
