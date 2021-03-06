title: ES3 to ES5(Extended)
date: 2014-09-07
tags:
    - ecma
    - es3
    - es5
    - ecma-262
---



List of ES3 Incompatibilities introduced by ES5.



From [Annex E](http://www.ecma-international.org/ecma-262/5.1/#sec-E):


 - [7.1](http://www.ecma-international.org/ecma-262/5.1/#sec-7.1): Unicode format control characters are no longer stripped from ECMAScript source text before processing. In Edition 5  if such a character appears in a StringLiteral or RegularExpressionLiteral the character will be incorporated into the literal where in Edition 3 the character would not be incorporated into the literal. 

    
    (function () {
      return eval('"\u200C\u200D\uFEFF".length  == 3');
    })();


<script>
document.write('Test Result:' + (function () {
      return eval('"\u200C\u200D\uFEFF".length  == 3');
    })());
</script>


 - [7.2](http://www.ecma-international.org/ecma-262/5.1/#sec-7.2): Unicode character <BOM> is now treated as whitespace and its presence in the middle of what appears to be an identifier could result in a syntax error which would not have occurred in Edition 3. 

    
    (function () {
      try {
        eval('var foo\uFEFFbar');
      } catch (e) {
        return e instanceof SyntaxError;
      }
    })()
<script>
document.write('Test Result:' + (function () {
    try {
    eval('var foo\uFEFFbar');
    } catch (e) {
    return e instanceof SyntaxError;
    }
})());
</script>

 - [7.3](http://www.ecma-international.org/ecma-262/5.1/#sec-7.3): Line terminator characters that are preceded by an escape sequence are now allowed within a string literal token. In Edition 3 a syntax error would have been produced. 

    
    (function () {
      try {
        eval("'foo\\\nbar';");
        return true;
      } catch (e) {
        return false;
      }
    })();

<script>
document.write('Test Result:' + (function () {
    try {
    eval("'foo\\\nbar';");
    return true;
    } catch (e) {
    return false;
    }
})());
</script>

 - [7.3](http://www.ecma-international.org/ecma-262/5.1/#sec-7.3): Regular expression literals now return a unique object each time the literal is evaluated. This change is detectable by any programs that test the object identity of such literal values or that are sensitive to the shared side effects. 

    
    (function () {
      function re(){ return /(?:)/; }
      return re() !== re();
    })();


<script>
document.write('Test Result:' + (function () {
      function re(){ return /(?:)/; }
      return re() !== re();
    })());
</script>

 - [7.8.5](http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.5): Edition 5 requires early reporting of any possible RegExp constructor errors that would be produced when converting a RegularExpressionLiteral to a RegExp object. Prior to Edition 5 implementations were permitted to defer the reporting of such errors until the actual execution time creation of the object. 

 - [7.8.5](http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.5): In Edition 5 unescaped "/" characters may appear as a CharacterClass in a regular expression literal. In Edition 3 such a character would have been interpreted as the final character of the literal. 

    
    (function () {
      try {
        var re = eval('/[/]/');
        return re.test('/');
      } catch (e) {
        return false;
      }
    })();


<script>
document.write('Test Result:' + (function () {
      try {
        var re = eval('/[/]/');
        return re.test('/');
      } catch (e) {
        return false;
      }
    })());
</script>

 - [10.4.2](http://www.ecma-international.org/ecma-262/5.1/#sec-10.4.2): In Edition 5  indirect calls to the eval function use the global environment as both the variable environment and lexical environment for the eval code. In Edition 3  the variable and lexical environments of the caller of an indirect eval was used as the environments for the eval code. 

    
    (function (global) {
      //TODO: maybe try other types of indirect calls
      return (function () { return global === (0 eval)('this'); }).call({});
    })(this);


<script>
document.write('Test Result:' + (function (global) {
      //TODO: maybe try other types of indirect calls
      return (function () { return global === (0 eval)('this'); }).call({});
    })(this));
</script>

 - [15.4.4](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4): In Edition 5 all methods of Array.prototype are intentionally generic. In Edition 3 toString and toLocaleString were not generic and would throw a TypeError exception if applied to objects that were not instances of Array. 

    
    (function () {
      try {
        Array.prototype.toString.call({});
        Array.prototype.toLocaleString.call({});
        return true;
      } catch (e) {
        return false;
      }
    });


<script>
document.write('Test Result:' + (function () {
      try {
        Array.prototype.toString.call({});
        Array.prototype.toLocaleString.call({});
        return true;
      } catch (e) {
        return false;
      }
    }()));
</script>

 - [10.6](http://www.ecma-international.org/ecma-262/5.1/#sec-10.6): In Edition 5 the array indexed properties of argument objects that correspond to actual formal parameters are enumerable. In Edition 3  such properties were not enumerable. 

    
    (function () {
      return arguments.propertyIsEnumerable('0');
    })(0);


<script>
document.write('Test Result:' + (function () {
      return arguments.propertyIsEnumerable('0');
    })(0));
</script>

 - [10.6](http://www.ecma-international.org/ecma-262/5.1/#sec-10.6): In Edition 5 the value of the [[Class]] internal property of an arguments object is "Arguments". In Edition 3  it was "Object". This is observable if toString is called as a method of an arguments object. 

    
    (function () {
      return ({}).toString.call(arguments) == "[object Arguments]";
    })();


<script>
document.write('Test Result:' + (function () {
      return ({}).toString.call(arguments) == "[object Arguments]";
    })());
</script>

 - [12.6.4](http://www.ecma-international.org/ecma-262/5.1/#sec-12.6.4): for-in statements no longer throw a TypeError if the in expression evaluates to null or undefined. Instead  the statement behaves as if the value of the expression was an object with no enumerable properties. 

    
    (function () {
      try {
        for(var prop in null);
        for(prop in undefined);
      } catch (e) {
        return false;
      }
      return true;
    })();


<script>
document.write('Test Result:' + (function () {
      try {
        for(var prop in null);
        for(prop in undefined);
      } catch (e) {
        return false;
      }
      return true;
    })());
</script>

 - [15](http://www.ecma-international.org/ecma-262/5.1/#sec-15): Implementations are now required to ignore extra arguments to standard built-in methods unless otherwise explicitly specified. In Edition 3 the handling of extra arguments was unspecified and implementations were explicitly allowed to throw a TypeError exception. 


 - [15.1.1](http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.1): The value properties NaN  Infinity  and undefined of the Global Object have been changed to be read-only properties. 

    
    (function (_NaN  _Infinity  _undefined) {
      NaN = Infinity = undefined = null;
      if (!isNaN(NaN) || Infinity != _Infinity || undefined !== _undefined) {
        //TODO: restore values
        return false;
      }
      return true;
    })(NaN  Infinity);


<script>
document.write('Test Result:' + (function (_NaN  _Infinity  _undefined) {
      NaN = Infinity = undefined = null;
      if (!isNaN(NaN) || Infinity != _Infinity || undefined !== _undefined) {
        //TODO: restore values
        return false;
      }
      return true;
    })(NaN  Infinity));
</script>

 - [15.1.2.1](http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.2.1): Implementations are no longer permitted to restrict the use of eval in ways that are not a direct call. In addition  any invocation of eval that is not a direct call uses the global environment as its variable environment rather than the caller's variable environment. 

    
    (function (global) {
      try {
        return [eval][0]('this') === global;
      } catch (e) {
        return false;
      }
    }).call({}  this);


<script>
document.write('Test Result:' + (function (global) {
      try {
        return [eval][0]('this') === global;
      } catch (e) {
        return false;
      }
    }).call({}  this));
</script>

 - [15.1.2.2](http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.2.2): The specification of the function parseInt no longer allows implementations to treat Strings beginning with a 0 character as octal values. 

    
    (function () {
      return parseInt('010') === 10;
    })();


<script>
document.write('Test Result:' + (function () {
      return parseInt('010') === 10;
    })());
</script>

 - [15.3.4.3](http://www.ecma-international.org/ecma-262/5.1/#sec-15.3.4.3): In Edition 3  a TypeError is thrown if the second argument passed to Function.prototype.apply is neither an array object nor an arguments object. In Edition 5  the second argument may be any kind of generic array-like object that has a valid length property. 

    
    (function () {
      try {
        return (function (a  b) { return a + b == 10; }).apply({}  {0:5  1:5  length:2});
      } catch (e) {
        return false;
      }
    })();


<script>
document.write('Test Result:' + (function () {
      try {
        return (function (a  b) { return a + b == 10; }).apply({}  {0:5  1:5  length:2});
      } catch (e) {
        return false;
      }
    })());
</script>

 - [15.3.4.3](http://www.ecma-international.org/ecma-262/5.1/#sec-15.3.4.3)  [15.3.4.4](http://www.ecma-international.org/ecma-262/5.1/#sec-15.3.4.4): In Edition 3 passing undefined or null as the first argument to either Function.prototype.apply or Function.prototype.call causes the global object to be passed to the indirectly invoked target function as the this value. If the first argument is a primitive value the result of calling ToObject on the primitive value is passed as the this value. In Edition 5  these transformations are not performed and the actual first argument value is passed as the this value. This difference will normally be unobservable to existing ECMAScript Edition 3 code because a corresponding transformation takes place upon activation of the target function. However  depending upon the implementation  this difference may be observable by host object functions called using apply or call. In addition  invoking a standard built-in function in this manner with null or undefined passed as the this value will in many cases cause behaviour in Edition 5 implementations that differ from Edition 3 behaviour. In particular  in Edition 5 built-in functions that are specified to actually use the passed this value as an object typically throw a TypeError exception if passed null or undefined as the this value. 

    
    (function () {
      try {
        //Maybe test ({}).toString.call(null) == '[object Null]'
        return ({}).hasOwnProperty.call(null  '')  false;
      } catch (e) {
        //ToObject in hasOwnProperty should throw TypeError if null
        return true;
      }
    })();



<script>
document.write('Test Result:' + (function () {
      try {
        //Maybe test ({}).toString.call(null) == '[object Null]'
        return ({}).hasOwnProperty.call(null  '')  false;
      } catch (e) {
        //ToObject in hasOwnProperty should throw TypeError if null
        return true;
      }
    })());
</script>

 - [15.3.5.2](http://www.ecma-international.org/ecma-262/5.1/#sec-15.3.5.2): In Edition 5  the prototype property of Function instances is not enumerable. In Edition 3  this property was enumerable. 

    
    !Function.propertyIsEnumerable('prototype');

<script>
    document.write('Test Result:' + !Function.propertyIsEnumerable('prototype'));
</script>

 - [15.5.5.2](http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.5.2): In Edition 5  the individual characters of a String object's [[PrimitiveValue] may be accessed as array indexed properties of the String object. These properties are non-writable and non-configurable and shadow any inherited properties with the same names. In Edition 3  these properties did not exist and ECMAScript code could dynamically add and remove writable properties with such names and could access inherited properties with such names. 

    
    (function () {
      String.prototype[1] = 'x';
      var foo = new String('foo');
      foo[0] = 'y'; //non-writable
      delete foo[0]; //non-configurable
      return foo[0] == 'f' && foo[1] == 'o';
    })();


<script>
document.write('Test Result:' + (function () {
      String.prototype[1] = 'x';
      var foo = new String('foo');
      foo[0] = 'y'; //non-writable
      delete foo[0]; //non-configurable
      return foo[0] == 'f' && foo[1] == 'o';
    })());
</script>

 - [15.9.4.2](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.4.2): Date.parse is now required to first attempt to parse its argument as an ISO format string. Programs that use this format but depended upon implementation specific behaviour (including failure) may behave differently. 

    
    (function () {
      try{
        return !!Date.parse("2014-09-07T15:24:08.011Z");
      }catch(e){
        return false;
      }
    })();

<script>
document.write('Test Result:' + (function () {
      try{
        return !!Date.parse("2014-09-07T15:24:08.011Z");
      }catch(e){
        return false;
      }
    })());
</script>

 - [15.10.2.12](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.12): In Edition 5  \s now additionally matches &lt;BOM&gt;. 

    
    (function () {
      return /\s/.test('\uFEFF');
    })();


<script>
document.write('Test Result:' + (function () {
      return /\s/.test('\uFEFF');
    })());
</script>

 - [15.10.4.1](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.4.1): In Edition 3  the exact form of the String value of the source property of an object created by the RegExp constructor is implementation defined. In Edition 5  the String must conform to certain specified requirements and hence may be different from that produced by an Edition 3 implementation. 


 - [15.10.6.4](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.6.4): In Edition 3  the result of RegExp.prototype.toString need not be derived from the value of the RegExp object's source property. In Edition 5 the result must be derived from the source property in a specified manner and hence may be different from the result produced by an Edition 3 implementation. 


 - [15.11.2.1](http://www.ecma-international.org/ecma-262/5.1/#sec-15.11.2.1)  [15.11.4.3](http://www.ecma-international.org/ecma-262/5.1/#sec-15.11.4.3): In Edition 5  if an initial value for the message property of an Error object is not specified via the Error constructor the initial value of the property is the empty String. In Edition 3  such an initial value is implementation defined.

    
    (function () {
      var error = new Error();
      return typeof error.message == 'string' && error.message.length == 0;
    })();


<script>
document.write('Test Result:' + (function () {
      var error = new Error();
      return typeof error.message == 'string' && error.message.length == 0;
    })());
</script>

 - [15.11.4.4](http://www.ecma-international.org/ecma-262/5.1/#sec-15.11.4.4): In Edition 3  the result of Error.prototype.toString is implementation defined. In Edition 5  the result is fully specified and hence may differ from some Edition 3 implementations. 

    
    (function () {
      var foo = new Error  bar = new Error;
      foo.name = 'Foo';
      foo.message = bar.name = 'Bar';
      return foo.toString() == 'Foo: Bar' && bar.toString() == 'Bar'; 
    })();


<script>
document.write('Test Result:' + (function () {
      var foo = new Error  bar = new Error;
      foo.name = 'Foo';
      foo.message = bar.name = 'Bar';
      return foo.toString() == 'Foo: Bar' && bar.toString() == 'Bar'; 
    })());
</script>

 - [15.12](http://www.ecma-international.org/ecma-262/5.1/#sec-15.12): In Edition 5  the name JSON is defined in the global environment. In Edition 3  testing for the presence of that name will show it to be undefined unless it is defined by the program or implementation.

    
    (function (global) {
      return typeof global.JSON != 'undefined';
    })(this);


<script>
document.write('Test Result:' + (function (global) {
      return typeof global.JSON != 'undefined';
    })(this));
</script>

From [Annex D](http://www.ecma-international.org/ecma-262/5.1/#sec-D):

 - [11.8.2](http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.2)  [11.8.3](http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.3)  [11.8.5](http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.5): ECMAScript generally uses a left to right evaluation order  however the Edition 3 specification language for the > and <= operators resulted in a partial right to left order. The specification has been corrected for these operators such that it now specifies a full left to right evaluation order. However  this change of order is potentially observable if side-effects occur during the evaluation process. 

    
    (function(){
      var i = 1  j = 1;
      (i*=2) > 1 > (i+=1);
      (j*=2) <= 1 <= (j+=1);
      return 3 === i && 3 === j;
    })();

<script>
document.write('Test Result:' + (function(){
    var i = 1  j = 1;
    (i*=2) > 1 > (i+=1);
    (j*=2) <= 1 <= (j+=1);
    return 3 === i && 3 === j;
})());

</script>

 - [11.1.4](http://www.ecma-international.org/ecma-262/5.1/#sec-11.1.4): Edition 5 clarifies the fact that a trailing comma at the end of an ArrayInitializer does not add to the length of the array. This is not a semantic change from Edition 3 but some implementations may have previously misinterpreted this. 

    
    (function () {
        return [1 ].length === 1;
    })();


<script>
document.write('Test Result:' + (function () {
        return [1 ].length === 1;
    })());
</script>

 - [11.2.3](http://www.ecma-international.org/ecma-262/5.1/#sec-11.2.3): Edition 5 reverses the order of steps 2 and 3 of the algorithm. The original order as specified in Editions 1 through 3 was incorrectly specified such that side-effects of evaluating Arguments could affect the result of evaluating MemberExpression. 


 - [12.4](http://www.ecma-international.org/ecma-262/5.1/#sec-12.4): In Edition 3  an object is created  as if by new Object() to serve as the scope for resolving the name of the exception parameter passed to a catch clause of a try statement. If the actual exception object is a function and it is called from within the catch clause  the scope object will be passed as the this value of the call. The body of the function can then define new properties on its this value and those property names become visible identifiers bindings within the scope of the catch clause after the function returns. In Edition 5  when an exception parameter is called as a function  undefined is passed as the this value. 


 - [13](http://www.ecma-international.org/ecma-262/5.1/#sec-13): In Edition 3  the algorithm for the production FunctionExpression with an Identifier adds an object created as if by new Object() to the scope chain to serve as a scope for looking up the name of the function. The identifier resolution rules (Section 10.1.4 in Edition 3) when applied to such an object will  if necessary  follow the object's prototype chain when attempting to resolve an identifier. This means all the properties of Object.prototype are visible as identifiers within that scope. In practice most implementations of Edition 3 have not implemented this semantics. Edition 5 changes the specified semantics by using a Declarative Environment Record to bind the name of the function. 


 - [15.10.6](http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.6): RegExp.prototype is now a RegExp object rather than an instance of Object. The value of its [[Class]] internal property which is observable using Object.prototype.toString is now "RegExp" rather than "Object".

    
    (function () {
      return ({}).toString.call(RegExp.prototype) == '[object RegExp]';
    })();


<script>
document.write('Test Result:' + (function () {
      return ({}).toString.call(RegExp.prototype) == '[object RegExp]';
    })());
</script>

Other changes:

 - [11.5.1](http://www.ecma-international.org/ecma-262/5.1/#sec-11.5.1): A PropertyName in a PropertyAssignment  can consist of an
 IdentifierName  this makes possible to use Reserved Words.

    
    (function () {
      var obj;
      try {
        eval('obj = {if:1}');
        return obj['if'] == 1;
      } catch (e) {
        return false;
      }
    })();


<script>
document.write('Test Result:' + (function () {
      var obj;
      try {
        eval('obj = {if:1}');
        return obj['if'] == 1;
      } catch (e) {
        return false;
      }
    })());
</script>
