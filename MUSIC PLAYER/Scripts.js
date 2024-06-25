const consumerKey = 'zVeaqWKqGYfeZBmYwxaB'; // Your consumer key
const consumerSecret = 'kyutAPhRkMfuQpKpQSVAErLwjGyKLPGe'; // Your consumer secret
const songName = 'shake it off'; // Replace with the song name you are searching for

async function getAlbumCoverBySongName(songName, consumerKey, consumerSecret) {
    const baseUrl = 'https://api.discogs.com/database/search';
    const params = new URLSearchParams({
        q: songName,
        type: 'release',
        key: consumerKey,
        secret: consumerSecret
    });

    const url = `${baseUrl}?${params.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const results = data.results;

        if (results.length === 0) {
            return 'No results found for the song.';
        }

        const release = results[0];
        const coverImageUrl = release.cover_image;

        if (coverImageUrl) {
            return coverImageUrl;
        } else {
            return 'No cover image found for the release.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return 'Error fetching data.';
    }
}

// Example usage
getAlbumCoverBySongName(songName, consumerKey, consumerSecret)
    .then(albumCoverUrl => console.log('Album Cover URL:', albumCoverUrl))
    .catch(error => console.error('Error:', error));
