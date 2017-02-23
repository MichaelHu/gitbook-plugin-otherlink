require( [ 'gitbook', 'jquery' ], function( gitbook, $ ) {

    function fixSummary() {
        $( '.book-summary nav li' ).each( function( index, item ) {
            fixSummaryItem( $( item ) );
        } );
    }

    function fixSummaryItem( $item ) {
        var title, href;
        var $link = $item.find( 'a' );
        var $span = $item.find( 'span' ); 

        if ( $link.length == 0
            && $span.length == 1 ) {
            title = $span.html();
            $span.remove();
            $( 
                '<a href="' + $item.data( 'path' ) + '" target="_blank">'
                + title + '</a>' 
            ).appendTo( $item );
        }
    }

    function fixPageLinks() {
        var $links = $( '.book-body a' );
        $links.each( function( index, link ) {
            var $link = $( link ), href = $link.attr( 'href' );
            if ( /^ref:\/\//.test( href ) ) {
                $link.attr( 'href', href.replace( /^ref:\/\//, '' ) );
            }
        } );
    }

    // invocation on pageready 
    fixSummary();
    fixPageLinks();
    
    // page.change invocation
    gitbook.events.on( 'page.change', function() {
        fixSummary();
        fixPageLinks();
    } );
} );
