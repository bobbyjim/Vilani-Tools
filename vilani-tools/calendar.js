///////////////////////////////////////////////////////////
//
//   Calendar functions
//
///////////////////////////////////////////////////////////

var zhodaniOffset = 58997389 + 50;

function setDate( dateStr, textArea )
{
   textArea.value = "";
   
   dateStr = dateStr.toLowerCase();
 
   if ( dateStr.match(  /(\d+)-(\d+)/ ) )
   {
      var day   = parseInt(RegExp.$1) - 1;
      var year  = parseInt(RegExp.$2);
      var hours = ( year * 365 + day ) * 24;
      
      calcZhodani( hours, textArea );
   }
   else
   if ( dateStr.match( /(\d+)\.(\d+)\.(\d+).(\d+)/ ) )
   {
      // zhodani, for now
      var olympiad = parseInt( RegExp.$1 );
      var year     = parseInt( RegExp.$2 ) - 1;
      var season   = parseInt( RegExp.$3 ) - 1;
      var day      = parseInt( RegExp.$4 );
      var hours    = (olympiad * 733 + year * 244 + season * 45 + day) * 27.02;
      
      calcImperial( hours - zhodaniOffset, textArea );
   }
}

function calcImperial( impHours, textArea )
{
   var days  = parseInt( impHours / 24 );
   var year  = parseInt( days / 365 );
   var day   = days % 365;
   
   textArea.value += "Imperial: " + day + "-" + year + "\n";
}

function calcZhodani( impHours, textArea )
{

   impHours += zhodaniOffset;
   var days = parseInt( impHours / 27.02 );
   var olympiads  = parseInt( days / 733 );
   var oRemainder = days % 733;
   
   var year = parseInt( oRemainder / 244 ) + 1;
   var day  = oRemainder % 244;

   
   // OK.  We have the day number, but the calendar isn't QUITE 41 days per month.
   // Solution: 
   //    if we're past season 4, add a day to account for the first 'missing day'.
   //    if we're past season 5, add a day to account for the final 'missing day'.

   if ( day > 164 ) day++;
   if ( day > 204 ) day++;

   // now every month essentially has 41 days.
   
   var season = parseInt( day / 41 );
   var seasonDay = day % 41;
   
   textArea.value += "[debug] " + days + "d : " + olympiads + "o : " + oRemainder + "r : " + year + "y : " + day + "d : " + season + "seas : " + seasonDay + "sd\n\n";
   
   var seasonArray = [ 'Atrint', 'Vrienstial', 'Atchafser', 'Ataniebl', 'Atshtiavl', 'Atpaipr' ];
   var holidayArray = [ 'Dranzhrin', 'Vipechaklstial', 'Dranzhrinatch', 'Kazdievlstial', 'Thequzastial' ];
   
   var doubleOlympiadDay = 'Atlthequziastial';
   
   var dayName = (seasonDay == 0)? holidayArray[ season ] : seasonArray[ season ] + "/" + seasonDay;
   
   // Check for the Olympiad leap day and Double Olympiad leap day.
   if ( year == 4 ) // the Olympiad leap day
   {
      year = 3;
      dayName = doubleOlympiadDay;
   }
   
   textArea.value += "Zhodani: " + olympiads + "." + year + " " + dayName 
                  + "  (" + olympiads + "." + year + "." + (season+1) + "." + seasonDay + ")\n";

}