//document.read jQuery stuff is below all this mess
function prliHasWhiteSpace(s) {
  return /\s/g.test(s);
}

var ButtonDialog = {
  local_ed : 'ed',
  init : function(ed) {
    ButtonDialog.local_ed = ed;
    tinyMCEPopup.resizeToInnerSize();

    //Used in our insert function for link text
    prli_selected_text = ed.selection.getContent();
  },
  insert_new : function insertButton(ed) {
    jQuery('#errors').html('');

    //Setup the vars
    var target      = jQuery('#prli_insert_link_target').val();
    var slug        = jQuery('#prli_insert_link_slug').val();
    var link_text   = jQuery('#prli_insert_link_link_text').val();
    var redirect    = jQuery('#prli_insert_link_redirect').val();
    var nofollow    = jQuery('#prli_insert_link_nofollow').val();
    var tracking    = jQuery('#prli_insert_link_tracking').val();
    var new_tab     = jQuery('#prli_insert_link_new_tab').is(':checked');
    var good_slug   = jQuery('#prli_is_valid_slug').val();

    //Change vars to actual defaults if default was chosen
    if(redirect == 'default') {
      redirect = default_redirect;
    }
    if(nofollow == 'default') {
      nofollow = default_nofollow;
    }
    if(tracking == 'default') {
      tracking = default_tracking;
    }

    //Some validations
    if(good_slug != 'good') {
      jQuery("#errors").append('* Slug must be valid<br/>').hide().fadeIn();
    }
    if(!target.match(/https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/)) {
      jQuery("#errors").append('* Target URL must be a valid, full URL (including http:// or https://)<br/>').hide().fadeIn();
    }
    if(slug.length === 0 || prliHasWhiteSpace(slug)) {
      jQuery("#errors").append('* You must enter a valid slug<br/>').hide().fadeIn();
    }

    //Where the magic happens
    if(jQuery("#errors").html() == '') {
      //Try to save the pretty link using AJAX
      var data = {
        action: 'prli_create_pretty_link',
        target: target,
        slug: slug,
        redirect: redirect,
        nofollow: nofollow,
        tracking: tracking
      };

      jQuery("#insert").hide();
      jQuery("#insert_loading").fadeIn();

      jQuery.post(ajaxurl, data, function(response) {
        var trimmed_data = response.replace(/^\s+|\s+$/g, ''); //Trim whitespace

        if(trimmed_data == 'true') {
          var output = '';
          var pretty_link = home_url + slug;

          //Set the link text to the link itself
          if(link_text.length === 0) {
            link_text = pretty_link;
          }

          // setup the output
          output = '<a href="' + pretty_link + '" ';

          if(new_tab) {
            output += 'target="_blank" ';
          }

          if(nofollow == 'enabled') {
            output += 'rel="nofollow" ';
          }

          output += '>' + link_text + '</a>';

          tinyMCEPopup.execCommand('mceReplaceContent', false, output);
          tinyMCEPopup.close();
        } else {
          //Link didn't save for some reason
          jQuery("#errors").append("* Link failed to be saved, double check your input below.").hide().fadeIn();
          jQuery("#insert_loading").hide();
          jQuery("#insert").fadeIn();
        }
      });
    }
    else {
      return false;
    }
  },
  insert_existing : function insertButton(ed) {
    jQuery('#errors').html('');

    var output      = '';
    var pretty_link = jQuery("#existing_link_slug").html();
    var link_text   = jQuery("#existing_link_link_text").val();
    var new_tab     = jQuery("#existing_link_new_tab").is(":checked");
    var nofollow    = jQuery("#existing_link_nofollow").val();

    if(pretty_link.match(/https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/)) {
      //Set the link text to the link itself
      if(link_text.length === 0) {
        link_text = pretty_link;
      }

      // setup the output
      output = '<a href="' + pretty_link + '" ';

      if(new_tab) {
        output += 'target="_blank" ';
      }

      if(nofollow == 1) {
        output += 'rel="nofollow" ';
      }

      output += '>' + link_text + '</a>';

      tinyMCEPopup.execCommand('mceReplaceContent', false, output);
      tinyMCEPopup.close();
    }
    else {
      jQuery("#errors").append("* You must search for and select an existing Pretty Link first.").hide().fadeIn();
      return false;
    }
  }
};

//Init the pop-up stuff
tinyMCEPopup.onInit.add(ButtonDialog.init, ButtonDialog);

//jQuery event stuff
(function($) {
  $(document).ready(function() {
    //Add a small delay so that prli_selected_text will be avaiable
    setTimeout(function() {
      //Nothing selected
      if(prli_selected_text.length === 0) {
        $("#prli_insert_link_link_text").val("Click Here");
        $("#existing_link_link_text").val("Click Here");
      }
      //If selected text is a link, make it the target URL
      else if(prli_selected_text.match(/https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/)) {
        $("#prli_insert_link_target").val(prli_selected_text);
        $("#prli_insert_link_link_text").val("Click Here");
        $("#existing_link_link_text").val("Click Here");
      //Show selected text
      } else {
        $("#prli_insert_link_link_text").val(prli_selected_text);
        $("#existing_link_link_text").val(prli_selected_text);
      }
    }, 200); //200ms

    //Validate Slug
    if($("#prli_is_valid_slug").val() == 'good') {
      $("#prlitinymce-good-slug").show();
    }

    function prli_is_valid_slug() {
      var s = $("#prli_insert_link_slug").val();

      var data = {
        action: 'prli_tinymce_validate_slug',
        slug: s
      };

      $("#prlitinymce-good-slug").hide();
      $("#prlitinymce-bad-slug").hide();
      $("#prlitinymce-thinking").show();

      $.post(ajaxurl, data, function(response) {
        var trimmed_data = response.replace(/^\s+|\s+$/g, ''); //Trim whitespace

        if(trimmed_data == 'true') {
          $("#prlitinymce-thinking").hide();
          $("#prlitinymce-good-slug").fadeIn();
          $("#prlitinymce-insert").fadeIn();
          $("#prli_is_valid_slug").val("good");
        } else {
          $("#prlitinymce-thinking").hide();
          $("#prlitinymce-insert").fadeOut();
          $("#prlitinymce-bad-slug").fadeIn();
          $("#prli_is_valid_slug").val("bad");
        }
      });
    }

    $("#prli_insert_link_slug").focusin(function() {
      $("#prlitinymce-good-slug").hide();
      $("#prlitinymce-bad-slug").hide();
      $("#prlitinymce-thinking").hide();
      $("#prlitinymce-insert").fadeOut();
    });

    $("#prli_insert_link_slug").focusout(function() {
      prli_is_valid_slug();
    });

    //Get rid of the "Click Here" text
    $('#prli_insert_link_link_text').focusin(function() {
      if($(this).val() == 'Click Here') {
        $(this).val("");
      }
    });
    $('#existing_link_link_text').focusin(function() {
      if($(this).val() == 'Click Here') {
        $(this).val("");
      }
    });

    //Load the accordion
    $("#prli_accordion").accordion({heightStyle: "content"});

    //Load the autocomplete stuff
    $('#prli_search_box').autocomplete({
      source: ajaxurl + "?action=prli_search_for_links",
      minLength: 2,
      select: function(event, ui) {
        $("#existing_link_target").html(ui.item.target);
        $("#existing_link_nofollow").val(ui.item.nofollow);
        $("#existing_link_slug").html(home_url + ui.item.slug);
      }
    });
  });
})(jQuery);
