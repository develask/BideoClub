var mysql = require('mysql');
var connection =  mysql.createConnection({
  	host : "localhost",
  	user : "root",
  	password: "euiti",
    multipleStatements: true
 });

connection.connect(function(err) {
  if (err){
      throw err;
  }
    console.log("conected!!");
});

connection.query("use bideoklub");
var User = function(izena, abizena, pasahitza){
    var ni;
    connection.query("select * from Bazkide where izena='"+izena+"' and abizena='"+abizena+"' and pasahitza='"+pasahitza+"'",function(err,data){
        if (err){
            new Error(" Error en la base de datos");
        }
        if (data.length==1){
            user.eginda=true;
            ni = data[0];
            setIzena(data[0].izena);
            setAbizena(data[0].abizena);
            setHelbidea(data[0].helbidea);
            setKreditua(data[0].kreditua);
            setEgoera(data[0].egoera);
        }else{
            user.eginda=false;
            new Error("Error en cuantos datos");
        }
    });
    
    this.getIzena=function(){
        try{
            return ni.izena;
        }catch(e){
            console.log(e.name + " - " + e.message);
        }
    }
    /**
     * @param {String} iz
     */
    var setIzena =function(iz){
        if(iz!=ni.izena){
            connection.query("update Bazkide set izena='"+iz+"' where izena='"+ni.izena+"' and abizena='"+ni.abizena+"'",function(err,data){    
                if (err){
                    throw ErrorEvent;
                }else{
                    ni.izena=iz;
                    $("#nagusia header h1").html(ni.izena + " " + ni.abizena);
                    $("#datupertsonalak input")[0].value = ni.izena;
                }
            });
        }else{
            ni.izena=iz;
            $("#nagusia header h1").html(ni.izena + " " + ni.abizena);
            $("#datupertsonalak input")[0].value = ni.izena;
        }
    }
    this.setIzena=setIzena;
    this.getAbizena=function(){
        try{
            return ni.abizena;
        }catch(e){
            console.log(e.name + " - " + e.message);
        }
    }
    /**
     * @param {String} ab
     */
    var setAbizena = function(ab){
        if(ab!=ni.abizena){
            connection.query("update Bazkide set abizena='"+ab+"' where izena='"+ni.izena+"' and abizena='"+ni.abizena+"'",function(err,data){    
                if (err){
                    throw ErrorEvent;
                }else{
                    ni.abizena=ab;
                    $("#nagusia header h1").html(ni.izena + " " + ni.abizena);
                    $("#datupertsonalak input")[1].value = ni.abizena;
                }
            });
        }else{
            ni.abizena=ab;
            $("#nagusia header h1").html(ni.izena + " " + ni.abizena);
            $("#datupertsonalak input")[1].value = ni.abizena;
        }
    }
    this.setAbizena=setAbizena;
    this.getHelbidea=function(){
        try{
            return ni.helbidea;
        }catch(e){
            console.log(e.name + " - " + e.message);
        }
    }
    /**
     * @param {String} helb
     */
    var setHelbidea=function(helb){
        if(helb!=ni.helbidea){
            connection.query("update Bazkide set helbidea='"+helb+"' where izena='"+ni.izena+"' and abizena='"+ni.abizena+"'",function(err,data){    
                if (err){
                    throw ErrorEvent;
                }else{
                    ni.helbidea=helb;
                    $("#datupertsonalak input")[2].value = ni.helbidea;
                }
            });
        }else{
            ni.helbidea=helb;
            $("#datupertsonalak input")[2].value = ni.helbidea;
        }
    }
    this.setHelbidea=setHelbidea;
    /**
     * @param {String} pass
     */
    var setPasahitza=function(pass){
        if(pass!=ni.pasahitza){
            connection.query("update Bazkide set pasahitza='"+pass+"' where izena='"+ni.izena+"' and abizena='"+ni.abizena+"'",function(err,data){
                if (err){
                    throw ErrorEvent;
                }else{
                    ni.pasahitza=pass;
                    $("#datupertsonalak input")[3].value = ni.pasahitza;
                    $("#datupertsonalak input")[4].value = ni.pasahitza;
                }
            });
        }else{
            ni.pasahitza=pass;
            $("#datupertsonalak input")[3].value = ni.pasahitza;
            $("#datupertsonalak input")[4].value = ni.pasahitza;
        }
    }
    this.setPasahitza=setPasahitza;
    this.getKreditua=function(){
        try{
            return ni.kreditua;
        }catch(e){
            console.log(e.name + " - " + e.message);
        }
    }
    /**
     * @param {int} kred
     */
    var setKreditua=function(kred){
        if(kred!=ni.kreditua){
            connection.query("update Bazkide set kreditua='"+kred+"' where izena='"+ni.izena+"' and abizena='"+ni.abizena+"'",function(err,data){
                if (err){
                    throw ErrorEvent;
                }else{
                    ni.kreditua=kred;
                    $("#dirua1").attr("value",ni.kreditua);
                    $("#dirua1").attr("min",ni.kreditua);
                    $("#dirua2").html(ni.kreditua);
                    $("#dirua3").html(parseInt(ni.kreditua));
                    $("#phartu input")[1].value = parseInt(ni.kreditua);
                }
            });
        }else{
            ni.kreditua=kred;
            $("#dirua1").attr("value",ni.kreditua);
            $("#dirua1").attr("min",ni.kreditua);
            $("#dirua2").html(ni.kreditua);
            $("#dirua3").html(parseInt(ni.kreditua));
            $("#phartu input")[1].value = parseInt(ni.kreditua);
        }
    }
    this.setKreditua=setKreditua;
    this.getNoiztik=function(){
        try{
            return ni.noiztik;
        }catch(e){
            console.log(e.name + " - " + e.message);
        }
    }
    this.getEgoera=function(){
        try{
            return ni.egoera;
        }catch(e){
            console.log(e.name + " - " + e.message);
        }
    }
    /**
     * @param {String} eg 1|2
     */
    var setEgoera=function(eg){
        if(eg!=ni.egoera){
            connection.query("update Bazkide set egoera='"+eg+"' where izena='"+ni.izena+"' and abizena='"+ni.abizena+"'",function(err,data){
                if (err){
                    throw ErrorEvent;
                }else{
                    ni.egoera=eg;
                }
            });
        }else{
            ni.egoera=eg;
        }
    }
    this.setEgoera=setEgoera;
}


function bazkideaSartu(izena, abizena, pasahitza, helbidea){
    helbidea = helbidea || null;
    var now = new Date();
    var jsonDate = now.toJSON();
    var then = new Date(jsonDate);
    connection.query("insert into Bazkide (izena, abizena, pasahitza, helbidea, kreditua, noiztik) values ('"+izena+"', '"+abizena+"', '"+pasahitza+"', '"+helbidea+"', '0', 'CURDATE()')");
}
function pelikulaSartu(tituloa, kodea, prezioa){
    connection.query("insert into Pelikula (tituloa, kodea, prezioa, egoera) values ('"+tituloa+"', '"+kodea+"', '"+prezioa+"', 'libre')");
}


/**
 * @param {String} tit "" null
 * @param {int} prez 0 null
 * @param {Object} egoera undefined null
 */
function bilatuPelikula( tit, prez, egoera){
    var query = "select tituloa, prezioa, egoera from Pelikula";
    if (tit != "" || prez != 0 || egoera != undefined){
        query = query + " where ";
    }
    if (tit != ""){
        query = query + "tituloa like '%"+ tit+ "%' ";
        if (prez != 0 ||egoera != undefined){
            query=  query + "and ";
        }
    }
    if (prez != 0){
        query = query + "prezioa <= '"+ prez + "' ";
        if (egoera != undefined){
            query=  query + "and ";
        }
    }
    if (egoera != undefined){
        query = query + "(";
        for (elem in egoera){
            query = query + "egoera='"+egoera[elem]+"'";
            if (egoera.indexOf(egoera[elem]) != egoera.length -1){
                query = query + " or ";
            }
        }
        query = query + ")";
    }
    connection.query(query, function(err, rows){
        if(err)	{
            throw err;
        }else{
            console.log(rows);
        }
    });
}
/**
 * @param {String} tabla
 * @param {Object} vals
 */
function sartu(tabla, vals){
    var atr = "(";
    var val = " values (";
    for (elem in vals){
        atr = atr + elem + ", ";
        val = val + "'" + vals[elem]+ "', ";
    }
    atr = atr.substring(0,atr.length - 2) + ")";
    val = val.substring(0,val.length - 2) + ")";
    connection.query("insert into " +tabla + " " + atr + val);
}
function bazkidearenEgoeraAldatu(izena, abizena, egoera){
    connection.query("update Bazkide set egoera='"+egoera+"' where izena='"+izena+"' and abizena='"+abizena+"'"); 
}
function konexioaItxi(){
    connection.end(function(err) {
        console.log("conexioa itxi");
    });
}