require( [ 'gitbook', 'jquery' ], function( gitbook, $ ) {

    function fixSummaryLinks() {
        fixLinks( $( '.book-summary nav li a' ) );
    }

    function fixPageLinks() {
        fixLinks( $( '.book-body a' ) );
    }

    function fixLinks( $links ) {
        $links.each( function( index, link ) {
            var $link = $( link ), href = $link.attr( 'href' );
            if ( /^ref:\/\//.test( href ) ) {
                $link.attr( 'href', href.replace( /^ref:\/\//, '' ) );
            }
        } );
    }

    // invocation on pageready 
    fixSummaryLinks();
    fixPageLinks();
    
    // page.change invocation
    gitbook.events.on( 'page.change', function() {
        fixSummaryLinks();
        fixPageLinks();
    } );

} );