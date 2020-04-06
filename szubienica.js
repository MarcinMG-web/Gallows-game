const hasla = ["Nosił wilk razy kilka",
"Nic nie trwa wietrznie",
"Wyjątek potwierdza regułę",
"Bileciki do kontroli",
"Być albo nie być oto jest pytanie",
"Jaki kraj taki obyczaj",
"Łatwiej mówić niż zrobić",
"Nigdy się nie poddawaj",
"Czas pokazał kto jest kim a kto nikim",
"Nic nie dzieje się bez przyczyny"];

function lookForPassword()
{
    let lookForNumber = Math.floor(Math.random()*hasla.length);
    return lookForNumber = hasla[lookForNumber];
}


let haslo = lookForPassword(); 

haslo = haslo.toUpperCase();

// Dźwięki
const yes = new Audio("yes.wav");
const no = new Audio("no.wav");


let dashPassword = "";

for(let i=0; i < haslo.length; i++)
{
    if (haslo.charAt(i) == " ") dashPassword = dashPassword + " "; 
    else dashPassword = dashPassword + "-";
}


function writedPassword()
{
    document.getElementById("board").innerHTML = dashPassword;
}

window.onload = start; // Po przeładowaniu inicjuj grę

const letter = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", 
        "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", 
        "T", "U", "V", "W", "X", "Y", "Z", "Ż", "Ź"];

function start()
{   // Tworzenie litere
    let inside_div = "";

    for(let i=0; i<=34; i++)// klejenie liter 7x5 
    {   
        const element = "lit"+ i; 

        inside_div = inside_div + '<div class = "letter" onclick= "check('+i+')" id = "'+element+'" >' + letter[i] +' </div>';
        if((i+1) % 7 == 0) inside_div = inside_div + '<div style = clear:both></div> '; // i+1 bo zaczynamy od 0
    }
    

    document.getElementById("alphabet").innerHTML = inside_div;



    writedPassword();
}

// Zamiana "-" na odpowiadającą literkę 
String.prototype.changeCharacter = function(placeCharacter,character) 
{
    if (placeCharacter > this.length-1) return this.toString(); // lenght -1 bo letter od  0
    else return this.substr(0,placeCharacter) + character + this.substr(placeCharacter +1);
}


let mistakePassword = 0; 

function check(nr)
{
    let hit = false; // tworzenie flagi
  

  for(i=0; i < haslo.length; i++)
    {// Odkrwanie hasła
        if (haslo.charAt(i) == letter[nr])
        {
            dashPassword = dashPassword.changeCharacter(i,letter[nr]);
            hit = true;
        }
    }
    if( hit == true )
        { // Zamiana literka na kolor
            yes.play();
            const element = "lit" + nr; // bo numer diva siedzi w zmiennej nr jest posyłany do funkcji
            document.getElementById(element).style.background = "#003300";
            document.getElementById(element).style.border = "3px solid #003300";
            document.getElementById(element).style.cursor = "default";
            document.getElementById(element).style.opacity = "70%";
                                   
            writedPassword();
        } else 
        {   no.play();
            
            const element = "lit" + nr;
            document.getElementById(element).style.background = "#8c1b07";
            document.getElementById(element).style.border = "3px solid #8c1b07";
            document.getElementById(element).style.cursor = "default";
            document.getElementById(element).style.opacity = "70%";
            document.getElementById(element).setAttribute("onclick",";");

            // skucha
            mistakePassword++;

            // Zmiana Szubienicy
            const gallowsImage = "img/s"+ mistakePassword+".jpg"// zmiana gallowsImageka
            document.getElementById("gallows").innerHTML = '<img src= "'+gallowsImage+'" alt=""/>'; 
            
        };

        // Wygrana
        if(haslo == dashPassword)
        {  
            document.getElementById("alphabet").innerHTML = "Tak jest! Podano prawidłowe hasło: " + haslo + 
            '<p>&nbsp;</p><span class="reset" onclick = "location.reload()">JESZCZE RAZ?</span>';
            
        }

        // Przegrana
        if(mistakePassword == 9)
        {
            document.getElementById("alphabet").innerHTML = "Niestety tym razem się nie udało! Prawidłowe hasło to: " + haslo + 
            '<p>&nbsp;</p><span class="reset" onclick = "location.reload()">JESZCZE RAZ?</span>';
        }

}


