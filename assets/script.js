//GLOBAL VAR
var i = 0
//Music search button starts ajax function calls
$("#findMusicBtn").click(function(event) {
    event.preventDefault();
    var artistName = $("#music-input").val();
    searchArtistName(artistName);
});
//Next button to grab next response
$("#nextSongBtn").click(function() {
    var artistName = $("#music-input").val();
    searchArtistName(artistName);
});
//Calls Deezer API
function searchArtistName(artistNameSearch) {
    var deezerApi = {
        "async": true,
        "crossDomain": true,
        "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artistNameSearch,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "d8bb7331d7mshcb58195d90da480p15ca06jsn0559dad38ac9"
        }
    }
    $.ajax(deezerApi).done(function(response) {
        getArtistSearchSong();
        getArtistSearchCover();
        console.log(response.data[0].preview);
        function getArtistSearchSong() {
            i++;
            var songName = (response.data[i].title);
            var songDiv = $("<div>");
            var songP = $("<p>");
            $("#deezerArtistName").text(response.data[i].artist.name);
            $("#deezerArtistSongName").text(songName);
            songP.attr("Class", "songP");
            songDiv.attr('class', 'songDiv');
            $(".songInfoClass").append(songP);
            //Calling songlyrics function
            getSongLyrics(songName, artistNameSearch);
        }
        $("#play").on("click",function(){
            $(".please").attr("src", response.data[i].preview)
        });
        function getArtistSearchCover() {
            var coverSmall = (response.data[i].album.cover_medium);
            $("#songCover").attr("src", coverSmall)


            var urbanApi = {
                "async": true,
                "crossDomain": true,
                "url": "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + artistNameSearch,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
                    "x-rapidapi-key": "7ac5693631msh1be654ee56cba4ap14b22cjsn1aef1fe207ca"
                }
            }
            $.ajax(urbanApi).done(function(response) {
                console.log(response);
                $("#who").text("WHO AM I?")
               $("#urbanDefinition").text(response.list[0].definition)
               
            });
        }
        
    });
}

//Calls Urban Dictionary API
// function getUrbanDef(name) {
    
//Calls Lyrics API
function getSongLyrics(songName, artistNameSearch) {
    var lyricsApi = {
        "async": true,
        "crossDomain": true,
        "url": "https://canarado-lyrics.p.rapidapi.com/lyrics/" + songName + artistNameSearch,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "canarado-lyrics.p.rapidapi.com",
            "x-rapidapi-key": "d8bb7331d7mshcb58195d90da480p15ca06jsn0559dad38ac9"
        }
    }
    $.ajax(lyricsApi).done(function(response) {
        displayArtistInfo();
        displaySongLyrics();
        function displayArtistInfo() {
            var displayArtistName = response.content[0].artist;
            var displaySongTitle = response.content[0].title;
            $("#artistName").text(displayArtistName);
            $("#artistSongName").text(displaySongTitle);
        }
        function displaySongLyrics() {
            var songLyrics = response.content[0].lyrics;
            $("#lyricsP").text(songLyrics);
        }
    });
}