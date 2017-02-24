require( [ 'gitbook', 'jquery' ], function( gitbook, $ ) {

    function fixSummaryLinks() {
        fixLinks( $( '.book-summary nav li a' ) );
    }

    function fixPageLinks() {
        fixLinks( $( '.book-body a' ) );
    }

    function fixLinks( $links ) {
        var bookRoot = gitbook.state.bookRoot;
        if ( !/\/$/.test( bookRoot ) ) {
            bookRoot += '/';
        } 
        $links.each( function( index, link ) {
            var $link = $( link ), href = $link.attr( 'href' );
            if ( /^ref:\/\//.test( href ) ) {
                $link.attr( 
                    'href'
                    , bookRoot + href.replace( /^ref:\/\//, '' ) 
                );
            }
        } );
    }

    // invocation on pageready 
    gitbook.push( function() {
        // gitbook.state is now ready
        fixSummaryLinks();
        fixPageLinks();
    } );

    // page.change invocation
    gitbook.events.on( 'page.change', function() {
        // console.log( gitbook );
        fixSummaryLinks();
        fixPageLinks();
    } );

} );
