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
                var officeOpenXmlTemplateStart = '<?xml version="1.0" encoding="UTF-8"?> <pkg:package xmlns:pkg="http://schemas.microsoft.com/office/2006/xmlPackage"> <pkg:part pkg:name="/_rels/.rels" pkg:contentType="application/vnd.openxmlformats-package.relationships+xml" pkg:padding="512"> <pkg:xmlData> <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"> <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/> </Relationships> </pkg:xmlData> </pkg:part> <pkg:part pkg:name="/word/document.xml" pkg:contentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"> <pkg:xmlData> <w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"> <w:body> <w:p>';
                var officeOpenXmlTemplateEnd = '</w:p> </w:body> </w:document> </pkg:xmlData> </pkg:part> </pkg:package>';
                var officeOpenXmlFragment = officeOpenXmlTemplateStart
                    + '<strong>Hello</strong>'
                    + officeOpenXmlTemplateEnd;

                Office.context.document.setSelectedDataAsync(officeOpenXmlFragment,
                    { coercionType: Office.CoercionType.Ooxml });

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