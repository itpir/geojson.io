
<script src="lib/jquery-1.10.2.min.js"></script>
$.getJSON('https://gist.github.com/DanRunfola/211d9dd9bc57f3cc62d37238b6e03b7c', function( d ) {
    window.api.data.set({map: d});
});