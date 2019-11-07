'use strict';
(function () {
    
    Office.onReady(function () {
        // Office is ready
        $(document).ready(function () {
            // The document is ready
            // Use this to check whether the API is supported in the Word client.
            if (Office.context.requirements.isSetSupported('WordApi', '1.1')) {
                // Do something that is only available via the new APIs
                $('#ajoutTextViaInputButton').click(ajoutTextViaInput);
                $('#ajoutSqrtButton').click(ajoutSqrt);
            }
            else {
                // Just letting you know that this code will not work with your version of Word.
                $('#supportedVersion').html('This code requires Word 2016 or later.');
            }
        });
    });

    function ajoutTextViaInput() {
        Word.run(function () {

            var text = $('#message').val();
            write(text);
            function write(message) {
                Office.context.document.setSelectedDataAsync(message);
            }
        })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
    }

    function ajoutSqrt() {
        Word.run(function (context) {

            var contentControls = context.document.contentControls;
            contentControls.
            // Queue a command to load the id property for all of the content controls. 
            context.load(contentControls, 'id');

            // Synchronize the document state by executing the queued commands, 
            // and return a promise to indicate task completion.
            return context.sync().then(function () {
                
                    contentControls.items[0].insertHtml(
                        '<strong>HTML content inserted into the content control.</strong>',
                        'Start');

                    // Synchronize the document state by executing the queued commands, 
                    // and return a promise to indicate task completion.
                    return context.sync()
                        .then(function () {
                            console.log('Inserted HTML in the first content control.');
                        });
                
            });
        })
            .catch(function (error) {
                console.log('Error: ' + JSON.stringify(error));
                if (error instanceof OfficeExtension.Error) {
                    console.log('Debug info: ' + JSON.stringify(error.debugInfo));
                }
            });
    }
})();