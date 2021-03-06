// Generated by CoffeeScript 1.12.6
(function() {
  var Test, Validator, digitRegex, emailRegex, upperCaseRegex, v;

  Test = (function() {
    function Test(sel, func, errMsg) {
      this.sel = sel;
      this.func = func;
      this.errMsg = errMsg;
    }

    Test.prototype.run = function() {
      if (this.func($(this.sel).val())) {
        return null;
      } else {
        return this.errMsg;
      }
    };

    return Test;

  })();

  Validator = (function() {
    function Validator(errList) {
      this.errList = errList;
      this.tests = [];
    }

    Validator.prototype.addTest = function(t) {
      return this.tests.push(t);
    };

    Validator.prototype.check = function() {
      var error, i, len, ref, t, valid;
      $(this.errList).empty();
      valid = true;
      ref = this.tests;
      for (i = 0, len = ref.length; i < len; i++) {
        t = ref[i];
        error = t.run();
        if (error !== null) {
          $(this.errList).append('<li>' + error + '</li>');
          valid = false;
        }
      }
      return valid;
    };

    return Validator;

  })();

  emailRegex = /^([a-zA-Z0-9!#$%&'*\+\-\/=?^_`{|}~]+(?:\.*[a-zA-Z0-9!#$%&'*\+\-\/=?^_`{|}~]+)*)@([a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)+)$/;

  upperCaseRegex = /.*[A-Z]+.*/;

  digitRegex = /.*[0-9]+.*/;

  v = new Validator('ul.errors');

  v.addTest(new Test('input[type=text]', (function(s) {
    return emailRegex.test(s);
  }), 'Please enter a valid email address'));

  v.addTest(new Test('input[type=password]', (function(s) {
    return s.length >= 8;
  }), 'Your password should be at least 8 characters long'));

  v.addTest(new Test('input[type=password]', (function(s) {
    return upperCaseRegex.test(s);
  }), 'Your password should contain at least one capital letter'));

  v.addTest(new Test('input[type=password]', (function(s) {
    return digitRegex.test(s);
  }), 'Your password should contain at least one number (0-9)'));

  $('ul.errors').empty();

  $('input[type=submit]').click(function(e) {
    if (!v.check()) {
      e.preventDefault();
    } else {
      $('form').submit();
      alert('Sign in successful!');
    }
    return null;
  });

}).call(this);
