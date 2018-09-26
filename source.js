


var ruchy =0;
var plansza;
var zaznaczeni;
var win=false;

function wypelnij(){
	
	grid =[];
	
	for(var i=0 ;i <32 ; i++){
		grid[i]=[];

	}
	
	for(var i=0 ;i< 32 ; i++){
		
		
		for(var j=0 ; j<32  ; j++){
			
			grid[i][j] =Math.floor((Math.random() * 5) + 0);
		}
			
	}
	
	
	//grid[5][6] =0;


	return grid;
};

function rysuj(){
	//if(win) return;
	c = document.getElementById("myCanvas");
	ctx = c.getContext("2d");

	zwyciestwo();
	for(var i=0 ;i< plansza.length ; i++){
		
		for(var j=0 ; j<plansza[i].length  ; j++){
			ctx.fillStyle="Yellow";
			switch(grid[i][j]){
				
				case 0:
					ctx.fillStyle="Green";
				break;
				
				case 1:
					ctx.fillStyle="Red";
				break;
				
				case 2:
					ctx.fillStyle="Blue";
				break;
				
				case 3:
					ctx.fillStyle="Yellow";
				break;
				
				case 4:
					ctx.fillStyle="Orange";
				break;
				
				
				
			};
			ctx.fillRect(i*16,j*16,16,16);
		}
			
	}

	//ctx.fillStyle="Green";
	//ctx.fillRect(32,32,32,32)
	ctx.stroke();
	
	
};

function maluj(x){
	if(ruchy>50){
	document.getElementById("wynik").innerHTML="Przegrales!";
	}
	if(x ==plansza[0][0] || win) return;
	ruchy++;
	document.getElementById("ruch").innerHTML ="Ruchy : "+ruchy+"/50";
	
	
	 kolor= plansza[0][0];
	 plansza[0][0]= x;
	 do_pomalowania=[];
	 temp =[0,0];
	 do_pomalowania.push(temp);
	 nastepny(0,0,kolor,x , do_pomalowania)
}

function nastepny(x , y ,starykolor , nowykolor , do_pomalowania){
	
	//plansza[x][y]=nowykolor;
	if(x>0 && plansza[x-1][y]==starykolor){
		var temp= [x-1 , y];
		do_pomalowania.push(temp);
	}

	if(x<plansza.length-1 && plansza[x+1][y]==starykolor){
		var temp= [x+1 , y];
		do_pomalowania.push(temp);
	}
	
	if(y>0 && plansza[x][y-1]==starykolor){
		var temp= [x , y-1];
		do_pomalowania.push(temp);
	}
	
	if(y<plansza.length-1 && plansza[x][y+1]==starykolor){
		var temp= [x , y+1];
		do_pomalowania.push(temp);
	}
	
	if(do_pomalowania.length==0) return;
	
	for(var i=0 ; i<do_pomalowania.length ; i++){
		plansza[do_pomalowania[i][0] ][ do_pomalowania[i][1]] = nowykolor;
		
	}
	//sleep(10);
	//rysuj();
	setTimeout(function(){rysuj()}, 15);
	
	for(var i=0 ; i<do_pomalowania.length ; i++){
		var tempx =do_pomalowania[i][0];
		var tempy =do_pomalowania[i][1];
		do_pomalowania.splice(i, 1);
		nastepny(tempx , tempy , starykolor , nowykolor , do_pomalowania);
		//rysuj();
	}
}

function zwyciestwo(){
	if(ruchy>50) return;
	var kol = plansza[0][0];

		for(var i=plansza.length-1 ; i>0; i--){
			for(var j=plansza.length-1 ; j>0 ;j--){
				if(plansza[i][j]!=kol)return;
				
			}
		}
		
		document.getElementById("wynik").innerHTML="Wygrales!";
		win=true;
	
}

window.onload = function main(){

plansza = wypelnij();

rysuj(plansza);

};

function reset(){
	win = false
	ruchy=0;
	document.getElementById("wynik").innerHTML="";
	document.getElementById("ruch").innerHTML ="Ruchy : "+ruchy+"/50";
	plansza = wypelnij();

	rysuj(plansza);
}

