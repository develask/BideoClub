var user;
$(document).ready(function() {
    $("section").hide();
    $("#login").fadeIn();
    $("#sartu").on("click", function(){
        var izena = $("#login > form > input")[0].value;
        var abizena = $("#login > form > input")[1].value;
        var pass = $("#login > form > input")[2].value;
        //aqui hay que elegir entre administrador y bezero por lo tanto comento la parte del bezero.
        //logeatu(izena,abizena,pass);
        try{
            user = new User(izena,abizena,pass);
            setTimeout(function(){
                if(user.eginda){
                    if (user.getEgoera() == "2"){
                        $("#nagusia > nav ul li.admin").css("display", "inline-block");
                    }
                    $("#login").fadeOut(200,function (){
                        $("#nagusia").fadeIn(200);
                        $("#phartu").slideDown("slow");
                    });
                }else{
                    $("#login input")[2].value = "";
                    alert("Datuak ez datoz bat");
                }
            },1000);
        }catch (err) {
            $("#login input")[2].value = "";
            alert("Datuak ez datoz bat");
        }
    });
    $("#sign").on("click", function() {
        $("#login > form > input")[0].value="";
        $("#login > form > input")[1].value="";
        $("#login > form > input")[2].value="";
        $("#login").fadeOut(200,function (){
            $("#signin").fadeIn(200);
        });
    });
    $("#back").on("click", function() {
        $("#signin > form > input")[0].value="";
        $("#signin > form > input")[1].value="";
        $("#signin > form > input")[2].value="";
        $("#signin > form > input")[3].value="";
        $("#signin > form > input")[4].value="";
        $("#signin").fadeOut(200,function (){
            $("#login").fadeIn(200);
        });
    });
    
    $("#signinboton").on("click", function() {
        var izena = $("#signin > form > input")[0].value;
        var abizena = $("#signin > form > input")[1].value;
        var pass1 = $("#signin > form > input")[2].value;
        var pass2 = $("#signin > form > input")[3].value;
        var helbidea = $("#signin > form > input")[4].value;
        if (izena=="" || abizena==""){
            alert("Izena eta Abizena beharrezkoak dira");
        }else{
            if (pass1!=pass2){
                $("#signin > form > input")[2].value="";
                $("#signin > form > input")[3].value="";
                alert("Pasahitzak ez datoz bat");
            }else{
                var now = new Date();
                connection.query("insert into Bazkide (izena, abizena, helbidea, pasahitza, kreditua, noiztik) values ('"+izena+"', '"+abizena+"', '"+helbidea+"', '"+pass1+"', '0', '"+now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"')", function(err){
                    if (err){
                        console.log(err);
                        $("#signin > form > input")[0].value="";
                        $("#signin > form > input")[1].value="";
                        $("#signin > form > input")[2].value="";
                        $("#signin > form > input")[3].value="";
                        $("#signin > form > input")[4].value="";
                        alert("Usuario hori sortuta dago jadanik");
                    }else{
                        user = new User(izena,abizena,pass1);
                        setTimeout(function(){
                            if(user.eginda){
                                if (user.getEgoera() == "2"){
                                    $("#nagusia > nav ul li.admin").css("display", "inline-block");
                                }
                                $("#signin").fadeOut(200,function (){
                                    $("#nagusia").fadeIn(200);
                                    $("#phartu").slideDown("slow");
                                });
                            }else{
                                $("#login input")[2].value = "";
                                alert("Datuak ez datoz bat");
                            }
                        },1000);
                    }
                });
            }
        }
    });
    
    $("#logout").on("click", function(){
        $("#nagusia").fadeOut(200,function (){
            $("#login input")[0].value = "";
            $("#login input")[1].value = "";
            $("#login input")[2].value = "";
            user=null;
            $("#login").fadeIn(200);
             $("article").slideUp("slow");
            $("#nagusia > nav ul li.admin").css("display", "none");
        });
        
    });
    $("#nagusia > nav ul li").on("click", function(){
        var pag = $(this).attr("name");
        $("article").slideUp("slow");
        if (pag=="bzegoera"){
            connection.query("select izena from Bazkide", function(err, lista){
                if (err){
                    console.log(err.name);
                }else{
                    $("#bezeroak").html("");
                    var ele =[];
                    for(var el in lista){
                        if(ele.indexOf(lista[el].izena)<0){
                            $("#bezeroak").append("<option value='"+lista[el].izena+"'/>");
                            ele.push(lista[el].izena);
                        }
                    }
                }
            });
        }else if (pag=="pbueltatu"){
            connection.query("select pKodea, tituloa, hartu from Alokatu, Pelikula where Alokatu.pkodea=Pelikula.kodea and bIzen='"+user.getIzena()+"' and bAbizena='"+user.getAbizena()+"' and itzuli is null", function(err,data){
                if (err){
                    console.log(err);
                }else{
                    $("#pbueltatu div ul").html("");
                    for (var el in data){
                        $("#pbueltatu div ul").append($("<li kodea="+data[el].pKodea+"><input type='checkbox'/>"+data[el].tituloa+"<span>"+data[el].hartu.getFullYear()+"/"+data[el].hartu.getMonth()+1+"/"+data[el].hartu.getDate()+"</span></li>"));
                    }
                }
            });
        }else if (pag=="pbajan"){
            connection.query("select tituloa, kodea from Pelikula where egoera='libre'", function(err, lista){
                if (err){
                    console.log(err.name);
                }else{
                    $("#pelidat").html("");
                    $("#pelikulak").html("");
                    for(var el in lista){
                        $("#pelikulak").append("<option value='"+lista[el].tituloa+" --> "+lista[el].kodea+"'/>");
                    }
                }
            });
        }
        setTimeout(function (){
            $("#"+pag).slideDown("slow");
        }, 600);
    });
    
    //Datu pertsonalak aldatu
    $("#datuakModifikatu").on("click",function(){
        var izena = $("#datupertsonalak input")[0].value;
        var abizena = $("#datupertsonalak input")[1].value;
        var helbidea = $("#datupertsonalak input")[2].value;
        var pass1 = $("#datupertsonalak input")[3].value;
        var pass2 = $("#datupertsonalak input")[4].value;
        if(pass1==pass2){
            try{
                user.setIzena(izena);
                setTimeout(function(){
                    user.setAbizena(abizena);
                    setTimeout(function(){
                        user.setHelbidea(helbidea);
                        setTimeout(function(){
                        if (pass1!=""){
                            user.setPasahitza(pass1);
                            $("#datupertsonalak input")[3].value="";
                            $("#datupertsonalak input")[4].value="";
                        }},100);
                        alert("Datuak ondo gorde dira!");
                    },100);
                },100);
            }catch(err){
                console.log(err.message);
                alert("arazo bat egon da datuak gordetzerakoan");
            }
        }else{
            $("#datupertsonalak input")[3].value="";
            $("#datupertsonalak input")[4].value="";
            alert("Pasahitzak ez datoz bat");
        }
    });
    
    //kreditua kargatu
    $("#dirua1").on("change", function(){
        $("#dirua2").html(this.value);
    });
    $("#rekarga").on("click",function(){
        user.setKreditua(parseInt($("#dirua2").html()));
        alert("Dirua ondo kargatu da");
    });
    
    //pelikula hartu
    $($("#phartu input")[1]).on('change', function(){
        $("#dirua3").html(this.value);
    });
    $("#phartu input").on("change",function(){
        var inputs = $("#phartu input");
        //console.log(inputs[0].value + "\n" + inputs[1].value + "\n" + inputs[2].value + ": " + inputs[2].checked + "\n" + inputs[3].value + ": " + inputs[3].checked +  "\n" + inputs[4].value + ": " + inputs[4].checked);
        var zenb=0;
        var quer="select * from Pelikula where tituloa like '%"+inputs[0].value.toLowerCase()+"%' and prezioa <= '"+inputs[1].value+"' and egoera in ("
        if(inputs[2].checked){
           quer= quer + "'"+inputs[2].value+"'";
           zenb++;
        } 
        if(inputs[3].checked && zenb>0){
                quer= quer + ", '"+inputs[3].value+"'";
                zenb++;
        }else if(inputs[3].checked){
            quer= quer + "'"+inputs[3].value+"'";
            zenb++;
        }
        if(inputs[4].checked && zenb>0){
            quer= quer + ", '"+inputs[4].value+"'";
        }else if (inputs[4].checked){
             quer= quer + "'"+inputs[4].value+"'";
        }
        if (inputs[5].checked){
            quer=quer+") order by prezioa";
        }else{
            quer=quer+") order by tituloa";
        }
        connection.query(quer,function(err,data){
            if (err){
                alert("Egoera bat gutxienez aukeratu");
            }
            $("#pelikulendatuak").html("");
            for(var el in data){
                $("#pelikulendatuak").append($("<li class="+data[el].egoera+" kodea='"+data[el].kodea+"'><p>"+ data[el].tituloa + "</p><span>" +data[el].prezioa + " &euro;</span></li>").on("click",function(){
                    var prezioa = parseFloat($($(this).children()[1]).html());
                    if ($(this).hasClass("libre")){
                        if(prezioa < user.getKreditua()){
                            if(confirm("'" + $($(this).children()[0]).html() + "' pelikula alkilatu nahi duzu " + $($(this).children()[1]).html() + "-gatik?")){
                                var now = new Date();
                                connection.query("update Pelikula set egoera='alokatuta' where kodea='"+ $(this).attr("kodea")+"'; insert into Alokatu (hartu, pKodea, bIzen, bAbizena) values ('"+now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"', '"+$(this).attr("kodea")+"', '"+user.getIzena()+"', '"+user.getAbizena()+"');",function(err,data){
                                    if(err){
                                        alert("operazioa txarto burutu da");
                                        console.log(err);
                                    }else{
                                        $("#pelikulendatuak").slideUp(function(){
                                            $("#pelikulendatuak").html("");
                                            $("#pelikulendatuak").slideDown();
                                        });
                                        alert("Operazioa ondo burutu da");
                                        user.setKreditua(user.getKreditua()-prezioa);
                                    }
                                });
                            }
                        }else{
                            alert("Ez duzu kreditu naikorik");
                        }
                    }else{
                        alert("Ezin da pelikula hau alkilatu");
                    }
                }));
            }
        });
        
    });
    
    //pelikula bueltatu
    $("#pbueltatub").on("click",function(){
        var a =$("#pbueltatu div ul li");
        var b=[]
        for (var i=0; i<a.length;i++){
            if ($(a[i]).children("input")[0].checked){
                b.push("'"+a[i].getAttribute("kodea")+"'");
            }
        }
        var now = new Date();
        connection.query("update Pelikula set egoera='libre' where kodea=("+b.toString()+"); update Alokatu set itzuli='"+now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+"' where pKodea=("+b.toString()+") and bIzen='"+user.getIzena()+"' and bAbizena='"+user.getAbizena()+"'", function(err,data){
            if (err){
                console.log(err);
                alert("Errore bat egon da");
            }else{
                alert("Pelikulak bueltatu dira");
                connection.query("select pKodea, tituloa, hartu from Alokatu, Pelikula where Alokatu.pkodea=Pelikula.kodea and bIzen='"+user.getIzena()+"' and bAbizena='"+user.getAbizena()+"' and itzuli is null", function(err,data){
                    if (err){
                        console.log(err);
                    }else{
                        $("#pbueltatu div ul").html("");
                        for (var el in data){
                            $("#pbueltatu div ul").append($("<li kodea="+data[el].pKodea+"><input type='checkbox'/>"+data[el].tituloa+"<span>"+data[el].hartu.getFullYear()+"/"+data[el].hartu.getMonth()+1+"/"+data[el].hartu.getDate()+"</span></li>"));
                        }
                    }
                });
            }
        });
    });
    
    
    //Bezero baten egoera aldatu
    $("#bezlist").on("change",function(){
        connection.query("select abizena from Bazkide where izena='" + $("#bezlist").val() + "'", function(err, lista){
            if (err){
                console.log(err.name);
            }else{
                $("#bezAbizenak").html("");
                for(var el in lista){
                    $("#bezAbizenak").append("<option value='"+lista[el].abizena+"'/>");$
                }
            }
        });
    });
    $("#Aldatu").on("click", function(){
        //console.log($($("#bzegoera .form input")[0]).val()+ " " + $($("#bzegoera .form input")[1]).val() + " " + $($("#bzegoera .form select")[0]).val());
        connection.query("update Bazkide set egoera='"+$($("#bzegoera .form select")[0]).val()+"' where izena='" + $($("#bzegoera .form input")[0]).val() +"' and abizena='"+$($("#bzegoera .form input")[1]).val()+"'", function(err){
            if (err){
                alert("errore bat egon da aldaketa egiterakoan");
            }else{
                alert("Egoera ondo aldatu da");
            }
        });
    });
    $("#Erakutsi").on("click", function(){
        connection.query("select * from Bazkide where izena='" + $($("#bzegoera .form input")[0]).val() +"' and abizena='"+$($("#bzegoera .form input")[1]).val()+"'", function(err, data){
            if(err || data.length!=1){
                alert("Datuak txarto atera dira");
            }else{
                $("#bezDatuak").html("");
                for(var el in data[0]){
                    if (el!="parse" && el!="_typeCast" ){
                        $("#bezDatuak").append("<p>"+ el+ ": " +data[0][el] + "</p>");
                    }
                }
            }
        });
    });
    
    //Pelikula altan eman
    $("#Pelikula-igo").on("click", function(){
        var izena = $("#paltan input")[0].value;
        var prezioa = $("#paltan input")[1].value;
        if (prezioa > 50){
            alert("Prezio maximoa 50\u20AC da");
        }else if(prezioa < 0.01){
            alert("Prezio minimoa 0,01\u20AC da");
        }else{
            connection.query("select count(*) from Pelikula", function(err, data){
                if (err){
                    alert("Errore bat egon da");
                    console.log(err);
                }else{
                    connection.query("insert into Pelikula (kodea, tituloa, prezioa, egoera) values ('"+data[0]["count(*)"]+"', '"+izena+"', '"+prezioa+"', 'libre')", function(err){
                        if (err){
                            alert("Errore bat egon da");
                            console.log(err);
                        }else{
                            alert("Pelikula berria sartuta");
                        }
                    });
                }
            });
        }
    });
    
    //pelikula bajan eman
    $("#ezabatu").on("click", function(){
        var izena= $("#pbajan input")[0].value;
        if (izena==""){
            alert("sartu pelikularen tituloa");
        }else{
            var kodea = izena.split(" --> ")[1];
            connection.query("update Pelikula set egoera='deskatalogatuta' where kodea='"+kodea+"'",function(err){
                if (err){
                    alert("errore bat egon da egoera aldatzean");
                    console.log(err);
                }else{
                    alert("Operazioa ondo burutu egin da");
                    $("#pbajan input")[0].value = "";
                    $("#pelikulak option[value='"+izena+"']").remove();
                }
            });
        }
    });
    $("#erakutsiDatuak").on("click", function(){
        var tituloa = $("#pbajan input")[0].value;
        if (tituloa==""){
            alert("sartu pelikularen tituloa");
        }else{
            var kodea = tituloa.split(" --> ")[1];
            connection.query("select bIzen, bAbizena, hartu from Pelikula as p join Alokatu as a on p.kodea=a.pKodea where p.kodea='"+kodea+"' order by hartu desc", function(err, data){
                if (err){
                    console.log(err);
                    alert("Errore bat egon da");
                }else{
                    console.log(data);
                    $("#pelidat").html("");
                    $("#pelidat").append("<h3>"+tituloa.split(" --> ")[0]+"</h3>");
                    $("#pelidat").append("<p>" + data.length + " aldiz izan da alokatuta</p>");
                    $("#pelidat").append($("<ul id='alP'><ul>"));
                    var fecha;
                    for (var el in data){
                        fecha = data[el].hartu;
                        $("#alP").append("<li><p>"+data[el].bIzen+" "+ data[el].bAbizena +"</p><span>"+fecha.getFullYear()+"/"+fecha.getMonth()+"/"+fecha.getDate()+"</span></li>");
                    }
                }
            });
        }
    });
    
});
var gui = require("nw.gui");
var win =gui.Window.get();
win.on('closed', function() {
    win = null;
  });
gui.Window.get().on("close",function(){
    this.hide();
    konexioaItxi();
    setTimeout(function(){console.log("fff");},3000);
    // If the new window is still open then close it.
    if (win != null){
      win.close(true);
    }
    // After closing the new window, close the main window.
    this.close(true);
});
