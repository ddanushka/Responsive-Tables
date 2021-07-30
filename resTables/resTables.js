/* 
 * RESPONSIVE TABLES
*/

(function ($) {

    $.fn.resTables = function (headerElement) {
        /* header - should be header element selector, Default value "TH", but could be passed through headerElement */
        headerElement = headerElement || "th";

        return this.each(function (tableIndex) {
            var cssLine = "",
                $head = $('head'),
                $style = $('<style></style>');
            
            var $this = $(this),
                /*
                     use the table 'id', if it exists, to create a unique css selector
                     
                     it's needed in case if we use several tables on ONE page
                     and some of them can be updated independently without updating other tables
                */
                rootId = $this.attr('id'),
                rootIdSelector = rootId ? '#' + rootId : '';

            $this.addClass("responsive-table responsive-table-" + tableIndex);
            
            var nodeIndexDelta = 1;
            $(headerElement, $this).each(function (nodeIndex) {
                /* Create Unique CSS selector for each TH */
                cssLine = cssLine + rootIdSelector + '.responsive-table-' + tableIndex + ' tbody td:nth-of-type(' + (nodeIndex + nodeIndexDelta) + '):before { content: "' + $(this).text().trim().replace(/\n/gi, '') + '";} ';
                // will get only the text and remove multiple lines
                var colspan = $(this).attr('colspan');

                // Ignore columns with colspan
                if (colspan) {
                    nodeIndexDelta += colspan - 1;
                }
            });
        
            if (rootId) {
                $head.find('style[data-table-id="' + rootId +'"]').remove(); // delete previous <style> node if exist or when re-iniciating
                $style.attr('data-table-id', rootId);
            }
            
            $style.text(cssLine);
            $head.append($style);
        });
    };
})(jQuery);

/* EXAMPLE 
    $(".gvi").resTables();
*/