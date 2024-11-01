/*
 * Slick Write Plugin 
 * Author: RussTek LLC
 *
 * http://www.slickwrite.com/
 *
 * Distributed under the LGPL
 */

(function() 
{
	tinymce.create('tinymce.plugins.slickwrite', {
		init: function(ed, url) {
			ed.addCommand('slickwriteSubmit', function() {
				var maxLength = 50000;
				var checkerURL = "http://www.slickwrite.com/?from=TinyMCE";

				var subject = ed.getContent();
				subject = subject.replace(/<\/?(a|span).*?>/gi, '');
				subject = subject.replace(/<br.*?>/gi, "\n");
				subject = subject.replace(/<(p|div|td|blockquote).*?>/gi, "\n\n");
				subject = subject.replace(/<.*?>/gi, '');
				
				if(subject.length == 0) {
					alert('You need to write something first!');
					return false;
				}
				
				var form = document.createElement("form");
				form.setAttribute("id", "slickwriteForm");
				form.setAttribute("method", "post");
				form.setAttribute("action", checkerURL);
				form.setAttribute("target", '_blank');
				var paper = document.createElement("input");
				paper.setAttribute("type", "hidden");
				paper.setAttribute("name", "paper");
				paper.setAttribute("value", subject.replace(/(\\|'|")/g, '\\$1').replace(/\n/gm, '\\n').replace(/\r/gm, ''));
				form.appendChild(paper);
				document.body.appendChild(form);
				form.submit();
				document.body.removeChild(document.getElementById('slickwriteForm'));
			});

			ed.addButton('slickwrite', {
				title : 'Proofread with Slick Write',
				cmd : 'slickwriteSubmit',
				image : url + '/slickwrite.gif'
			});
		},
		
		getInfo: function() {
			return ({
					longname :  'Slick Write',
					author :    'RussTek LLC',
					authorurl : '',
					infourl :   'http://www.slickwrite.com/',
					version :   '1.0'
				});
		}
	});
	
	tinymce.PluginManager.add('slickwrite', tinymce.plugins.slickwrite);
})();
