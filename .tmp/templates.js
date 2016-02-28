angular.module('wcsdesktopApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/account/login/login.html',
    "<navbar></navbar><div class=container><div class=row><div class=col-sm-12><form class=form name=form ng-submit=vm.login(form) novalidate><div class=form-group><label>Email</label><input type=email name=email class=form-control ng-model=vm.user.email required></div><div class=form-group><label>Password</label><input type=password name=password class=form-control ng-model=vm.user.password required></div><div class=\"form-group has-error\"><p class=help-block ng-show=\"form.email.$error.required && form.password.$error.required && vm.submitted\">Please enter your email and password.</p><p class=help-block ng-show=\"form.email.$error.email && vm.submitted\">Please enter a valid email.</p><p class=help-block>{{ vm.errors.other }}</p></div><div><button class=\"btn btn-inverse btn-lg btn-login\" type=submit>Login</button> <a class=\"btn btn-default btn-lg btn-register\" ui-sref=signup>Register</a></div></form></div></div><hr></div>"
  );


  $templateCache.put('app/account/settings/settings.html',
    "<navbar></navbar><div class=container><div class=row><div class=col-sm-12><h1>Change Password</h1></div><div class=col-sm-12><form class=form name=form ng-submit=vm.changePassword(form) novalidate><div class=form-group><label>Current Password</label><input type=password name=password class=form-control ng-model=vm.user.oldPassword mongoose-error><p class=help-block ng-show=form.password.$error.mongoose>{{ vm.errors.other }}</p></div><div class=form-group><label>New Password</label><input type=password name=newPassword class=form-control ng-model=vm.user.newPassword ng-minlength=7 required><p class=help-block ng-show=\"(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || vm.submitted)\">Password must be at least 7 characters.</p></div><div class=form-group><label>Confirm New Password</label><input type=password name=confirmPassword class=form-control ng-model=vm.user.confirmPassword match=vm.user.newPassword ng-minlength=7 required><p class=help-block ng-show=\"form.confirmPassword.$error.match && vm.submitted\">Passwords must match.</p></div><p class=help-block>{{ vm.message }}</p><button class=\"btn btn-lg btn-primary\" type=submit>Save changes</button></form></div></div></div>"
  );


  $templateCache.put('app/account/signup/signup.html',
    "<navbar></navbar><div class=container><div class=row><div class=col-sm-12><h1>Sign up</h1></div><div class=col-sm-12><form class=form name=form ng-submit=vm.register(form) novalidate><div class=form-group ng-class=\"{ 'has-success': form.name.$valid && vm.submitted, 'has-error': form.name.$invalid && vm.submitted }\"><label>First and Last Name</label><input name=name class=form-control ng-model=vm.user.name required><p class=help-block ng-show=\"form.name.$error.required && vm.submitted\">A name is required</p></div><div class=form-group ng-class=\"{ 'has-success': form.email.$valid && vm.submitted, 'has-error': form.email.$invalid && vm.submitted }\"><label>Email</label><input type=email name=email class=form-control ng-model=vm.user.email required mongoose-error><p class=help-block ng-show=\"form.email.$error.email && vm.submitted\">Doesn't look like a valid email.</p><p class=help-block ng-show=\"form.email.$error.required && vm.submitted\">What's your email address?</p><p class=help-block ng-show=form.email.$error.mongoose>{{ vm.errors.email }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.department.$valid && vm.submitted, 'has-error': form.department.$invalid && vm.submitted }\"><b>Department</b><select class=form-control ng-model=vm.user.department><option>Customer Service</option><option>Dealer Customer Service</option><option>Innovations</option><option>Marketing</option><option>Shipping</option><option>Expereicne Specialists</option><option>Dealer Expereince Specialists</option><option>Quality Assurance</option><option>Mass Merchandising</option><option>Road Show</option><option>Little Giant Safety</option><option>Little Giant Global</option><option>Sales</option></select><p class=help-block ng-show=\"form.department.$error.required && vm.submitted\">What's your department?</p><p class=help-block ng-show=form.department.$error.mongoose>{{ vm.errors.department }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.password.$valid && vm.submitted, 'has-error': form.password.$invalid && vm.submitted }\"><label>Password</label><input type=password name=password class=form-control ng-model=vm.user.password ng-minlength=7 required mongoose-error><p class=help-block ng-show=\"(form.password.$error.minlength || form.password.$error.required) && vm.submitted\">Password must be at least 7 characters.</p><p class=help-block ng-show=form.password.$error.mongoose>{{ vm.errors.password }}</p></div><div class=form-group ng-class=\"{ 'has-success': form.confirmPassword.$valid && vm.submitted, 'has-error': form.confirmPassword.$invalid && vm.submitted }\"><label>Confirm Password</label><input type=password name=confirmPassword class=form-control ng-model=vm.user.confirmPassword match=vm.user.password ng-minlength=3 required><p class=help-block ng-show=\"form.confirmPassword.$error.match && vm.submitted\">Passwords must match.</p></div><div><button class=\"btn btn-inverse btn-lg btn-register\" type=submit>Sign up</button> <a class=\"btn btn-default btn-lg btn-login\" ui-sref=login>Login</a></div></form></div></div><hr></div>"
  );


  $templateCache.put('app/admin/admin.html',
    "<navbar></navbar><div class=container><div class=search><input class=\"form-control col-sm-3\" placeholder=\"Search Users\" ng-model=search.$></div><br><p>The update and delete users as you need &nbsp (¬‿¬)</p><ul class=\"list-group user-list\"><li class=list-group-item ng-repeat=\"user in admin.users | filter:search:strict | orderBy:'name'\"><div class=user-info><strong>{{user.name}}</strong><br><a href=mailto:{{user.email}}>{{user.email}}</a><br><br><div class=col-sm-4>Role:<select class=\"form-control col-sm-2\" ng-model=user.role><option>admin</option><option>employee</option><option>user</option></select></div><div class=col-sm-4>Department:<select class=form-control ng-model=user.department><option>Customer Service</option><option>Dealer Customer Service</option><option>Innovations</option><option>Marketing</option><option>Shipping</option><option>Expereicne Specialists</option><option>Dealer Expereince Specialists</option><option>QA</option><option>Mass Merchandising</option><option>Road Show</option><option>Little Giant Safety</option><option>Little Giant Global</option><option>Sales</option></select></div></div><div><div class=padding><a ng-click=admin.update(user) class=update><span class=\"fa fa-refresh fa-2x\"></span></a></div><div class=padding><a ng-click=admin.delete(user) class=trash><span class=\"fa fa-trash fa-2x\"></span></a></div></div></li></ul></div><footer></footer>"
  );


  $templateCache.put('app/main/404.html',
    "<!DOCTYPE html><html lang=en><head><meta charset=utf-8><title>Page Not Found :(</title><style>::-moz-selection {\n" +
    "        background: #b3d4fc;\n" +
    "        text-shadow: none;\n" +
    "      }\n" +
    "\n" +
    "      ::selection {\n" +
    "        background: #b3d4fc;\n" +
    "        text-shadow: none;\n" +
    "      }\n" +
    "\n" +
    "      html {\n" +
    "        padding: 30px 10px;\n" +
    "        font-size: 20px;\n" +
    "        line-height: 1.4;\n" +
    "        color: #737373;\n" +
    "        background: #f0f0f0;\n" +
    "        -webkit-text-size-adjust: 100%;\n" +
    "        -ms-text-size-adjust: 100%;\n" +
    "      }\n" +
    "\n" +
    "      html,\n" +
    "      input {\n" +
    "        font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n" +
    "      }\n" +
    "\n" +
    "      body {\n" +
    "        max-width: 500px;\n" +
    "        _width: 500px;\n" +
    "        padding: 30px 20px 50px;\n" +
    "        border: 1px solid #b3b3b3;\n" +
    "        border-radius: 4px;\n" +
    "        margin: 0 auto;\n" +
    "        box-shadow: 0 1px 10px #a7a7a7, inset 0 1px 0 #fff;\n" +
    "        background: #fcfcfc;\n" +
    "      }\n" +
    "\n" +
    "      h1 {\n" +
    "        margin: 0 10px;\n" +
    "        font-size: 50px;\n" +
    "        text-align: center;\n" +
    "      }\n" +
    "\n" +
    "      h1 span {\n" +
    "        color: #bbb;\n" +
    "      }\n" +
    "\n" +
    "      h3 {\n" +
    "        margin: 1.5em 0 0.5em;\n" +
    "      }\n" +
    "\n" +
    "      p {\n" +
    "        margin: 1em 0;\n" +
    "      }\n" +
    "\n" +
    "      ul {\n" +
    "        padding: 0 0 0 40px;\n" +
    "        margin: 1em 0;\n" +
    "      }\n" +
    "\n" +
    "      .container {\n" +
    "        max-width: 380px;\n" +
    "        _width: 380px;\n" +
    "        margin: 0 auto;\n" +
    "      }\n" +
    "\n" +
    "      /* google search */\n" +
    "\n" +
    "      #goog-fixurl ul {\n" +
    "        list-style: none;\n" +
    "        padding: 0;\n" +
    "        margin: 0;\n" +
    "      }\n" +
    "\n" +
    "      #goog-fixurl form {\n" +
    "        margin: 0;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-qt,\n" +
    "      #goog-wm-sb {\n" +
    "        border: 1px solid #bbb;\n" +
    "        font-size: 16px;\n" +
    "        line-height: normal;\n" +
    "        vertical-align: top;\n" +
    "        color: #444;\n" +
    "        border-radius: 2px;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-qt {\n" +
    "        width: 220px;\n" +
    "        height: 20px;\n" +
    "        padding: 5px;\n" +
    "        margin: 5px 10px 0 0;\n" +
    "        box-shadow: inset 0 1px 1px #ccc;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-sb {\n" +
    "        display: inline-block;\n" +
    "        height: 32px;\n" +
    "        padding: 0 10px;\n" +
    "        margin: 5px 0 0;\n" +
    "        white-space: nowrap;\n" +
    "        cursor: pointer;\n" +
    "        background-color: #f5f5f5;\n" +
    "        background-image: -webkit-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        background-image: -moz-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        background-image: -ms-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        background-image: -o-linear-gradient(rgba(255,255,255,0), #f1f1f1);\n" +
    "        -webkit-appearance: none;\n" +
    "        -moz-appearance: none;\n" +
    "        appearance: none;\n" +
    "        *overflow: visible;\n" +
    "        *display: inline;\n" +
    "        *zoom: 1;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-sb:hover,\n" +
    "      #goog-wm-sb:focus {\n" +
    "        border-color: #aaa;\n" +
    "        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);\n" +
    "        background-color: #f8f8f8;\n" +
    "      }\n" +
    "\n" +
    "      #goog-wm-qt:hover,\n" +
    "      #goog-wm-qt:focus {\n" +
    "        border-color: #105cb6;\n" +
    "        outline: 0;\n" +
    "        color: #222;\n" +
    "      }\n" +
    "\n" +
    "      input::-moz-focus-inner {\n" +
    "        padding: 0;\n" +
    "        border: 0;\n" +
    "      }</style></head><body><div class=container><h1>Not found<br><br><span>¯\\_(ツ)_/¯</span></h1><br><br><p>Sorry, but the page you were trying to view does not exist.</p><p>It looks like this was the result of either:</p><ul><li>a mistyped address</li><li>an out-of-date link</li></ul><p>Please enjoy this image</p><img class=img-responsive src=http://i.imgur.com/atz81.jpg alt=\"Cat Riding Unicorn\"><script>var GOOG_FIXURL_LANG = (navigator.language || '').slice(0,2),GOOG_FIXURL_SITE = location.host;</script><script src=//linkhelp.clients.google.com/tbproxy/lh/wm/fixurl.js></script></div></body></html>"
  );


  $templateCache.put('app/main/customerService.html',
    "<navbar></navbar><div class=container ng-controller=CSCtrl><br><br><div class=col-sm-2></div><form name=CSForm enctype=multipart/form-data method=post class=\"form-horizontal col-sm-7\" novalidate><div class=form-group ng-class=\"{ 'has-error': CSForm.name.$touched && CSForm.name.$invalid, 'has-success': CSform.name.$touched && CSForm.name.$valid }\" id=nameId><label class=\"col-sm-2 control-label required\" for=nameInput>Name:</label><div class=col-sm-10><input class=form-control name=name ng-model=customer.name id=nameInput placeholder=Name ng-minlength=5 required></div><div ng-messages=CSForm.name.$error ng-if=CSForm.name.$touched><p class=col-sm-2></p><p class=col-sm-10 ng-message=minlength>Please input both the first and last name.</p><p class=col-sm-10 ng-message=required>Customer name is required.</p></div></div><div class=form-group ng-class=\"{ 'has-error': CSForm.phone.$touched && CSForm.phone.$invalid, 'has-success': CSForm.phone.$touched && CSForm.phone.$valid }\"><label class=\"col-sm-2 control-label required\" for=phoneInput>Phone:</label><div class=col-sm-10><input class=form-control id=phoneInput ng-model=customer.phone type=tel name=phone placeholder=Phone required ng-minlength=11></div><div ng-messages=CSForm.phone.$error ng-if=CSForm.phone.$touched><p class=col-sm-2></p><p class=col-sm-10 ng-message=minlength>Please format phone number like \"555-555-5555\".</p><p class=col-sm-10 ng-message=required>a phone number is required.</p></div></div><div class=form-group ng-class=\"{ 'has-error': CSForm.email.$touched && CSForm.email.$invalid, 'has-success': CSForm.email.$touched && CSForm.email.$valid }\"><label class=\"col-sm-2 control-label required\" for=emailInput>Email:</label><div class=col-sm-10><input class=\"form-control required\" name=email id=emailInput ng-model=customer.email type=email placeholder=Email required></div><div ng-messages=CSForm.email.$error ng-if=CSForm.email.$touched><p class=col-sm-2></p><p class=col-sm-10 ng-message=email>Please input a valid email.</p><p class=col-sm-10 ng-message=required>a email is required.</p></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=companyInput>Company (if Applicable)</label><div class=col-sm-10><input class=form-control id=companyInput ng-model=customer.company placeholder=company></div></div><div class=form-group><label class=\"col-sm-2 control-label required\" ng-class=\"{ 'has-error': CSform.product.$touched && CSForm.product.$invalid, 'has-success': CSform.product.$touched && CSForm.product.$valid }\" for=productInput>Product:</label><div class=col-sm-10><select class=\"form-control col-sm-10\" ng-model=customer.product required name=product><option>Accessory</option><option>Aerial Safety Cage</option><option>Aircraft Support</option><option>Airwing</option><option>Airwing FG</option><option>Alta-One</option><option>As Seen on TV</option><option>Assaut Ramp</option><option>Boost</option><option>Classic Combo SXE</option><option>Compact Safety Cage</option><option>Conquest</option><option>Darkhorse</option><option>Flip-N-Lite</option><option>Ledge Lock</option><option>Little Giant LT</option><option>Lunar</option><option>Microburst</option><option>Pro Series</option><option>Quantum</option><option>Revolution</option><option>Safeframe</option><option>Select Step</option><option>Select Step FG</option><option>Skyscraper</option><option>Smartstep</option><option>Sumostance</option><option>Super Duty</option><option>Tactical Ladder</option><option>Titan</option><option>Titan X</option><option>Velocity</option><option>Xtreme</option></select></div><div ng-messages=CSForm.product.$error ng-if=CSForm.product.$touched><p class=col-sm-2></p><p ng-message=$valid>Please pick a product that this is related to.</p><p ng-message=required>Product is required.</p></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=noticeLabelInput>Part Number</label><div class=col-sm-10><input class=form-control id=noticeLabelInput ng-model=customer.noticeLabel placeholder=\"Notice Label\"> <span id=helpBlock class=help-block>The part number is found on the notice label.</span></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=manufactureDateInput>Manufacture Date</label><div class=col-sm-10><input class=form-control ng-model=customer.manufactureDate id=manufactureDateInput placeholder=\"Manufacture Date\"> <span id=helpBlock class=help-block>The manufacturing date stamp typically contains a combination of 5-6 numbers and may contain a letter.</span></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=orderNumberInput>Order Number</label><div class=col-sm-10><input class=form-control ng-model=customer.orderNumber id=orderNumberInput placeholder=\"Order Number\"> <span id=helpBlock class=help-block>The order number.</span></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=issueInput>Issue</label><div class=col-sm-10><select class=form-control ng-model=customer.issue name=issue><option>Customer Expereince</option><option>Warranty</option><option>Kudos</option><option>Voice of the Customer</option></select></div></div><div class=form-group><label class=\"col-sm-2 control-label\" for=textAreaInput>Notes</label><div class=col-sm-10><textarea class=form-control ng-model=customer.notes id=textAreaInput type=text placeholder=Notes></textarea><span id=helpBlock class=help-block>Please include any applicable notes about the customers case/situation and what you were able to do to resolve it.</span></div></div><div class=form-group><button type=submit ng-disabled=CSForm.$invalid ng-click=update(customer) class=\"btn btn-block\">Submit</button></div></form></div><footer></footer>"
  );


  $templateCache.put('app/main/detailedView.html',
    "<navbar></navbar><div class=container ng-controller=detailedCtrl><br><div ng-init=getVOC()><table class=\"table table-hover table-bordered\"><h4>Customer Information</h4><tr><td class=col-sm-2>Name:</td><td><input class=input ng-model=details.name ng-blur=doneEditing(details) autofocus></td></tr><tr><td class=col-sm-2>Date:</td><td>{{details.date | date}}</td></tr><tr><td>Email:</td><td><input class=input ng-model=details.email ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Phone:</td><td><input class=input ng-model=details.phone ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Company:</td><td><input class=input ng-model=details.company ng-blur=doneEditing(details) autofocus></td></tr><tr></tr><tr><td>Order Number:</td><td><input class=input ng-model=details.orderNumber ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Assigned Agent:</td><td><select class=\"form-control col-sm-2\" ng-model=details.assignedAgent><option ng-repeat=\"user in users | orderBy:&quot;name&quot;\">{{user.name}}</option></select></td></tr><tr><td>Status:</td><td><select class=\"form-control col-sm-2\" ng-model=details.resolutionStatus><option>resolved</option><option>unresolved</option></select></td></tr></table><table class=\"table table-bordered table-hover\"><h4>Product Information</h4><tr><td class=col-sm-2>Product:</td><td><div><select class=\"form-control col-sm-10\" ng-model=details.product required name=product><option>Accessory</option><option selected>Aerial Safety Cage</option><option>Aircraft Support</option><option>Airwing</option><option>Airwing FG</option><option>Alta-One</option><option>As Seen on TV</option><option>Assaut Ramp</option><option>Boost</option><option>Classic Combo SXE</option><option>Compact Safety Cage</option><option>Conquest</option><option>Darkhorse</option><option>Flip-N-Lite</option><option>Ledge Lock</option><option>Little Giant LT</option><option>Lunar</option><option>Microburst</option><option>Pro Series</option><option>Quantum</option><option>Revolution</option><option>Safeframe</option><option>Select Step</option><option>Select Step FG</option><option>Skyscraper</option><option>Smartstep</option><option>Sumostance</option><option>Super Duty</option><option>Tactical Ladder</option><option>Titan</option><option>Titan X</option><option>Velocity</option><option>Xtreme</option></select></div></td></tr><tr><td>Manufacture Date:</td><td><input class=input ng-model=details.manufactureDate ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Part Number:</td><td><input class=input ng-model=details.partNumber ng-blur=doneEditing(details) autofocus></td></tr><tr><td>Notes</td><td><textarea class=input ng-model=details.notes ng-blur=doneEditing(details) autofocus>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  <tr>\n" +
    "    <td>\n" +
    "      Image\n" +
    "    </td>\n" +
    "    <td>\n" +
    "      <img ng-src={{details.image}} alt=\"No images were submitted\">\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  <tr>\n" +
    "    <td>\n" +
    "      Image\n" +
    "    </td>\n" +
    "    <td>\n" +
    "      <img ng-src={{details.image0}} alt=\"No images were submitted\">\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  <tr>\n" +
    "    <td>\n" +
    "      Image\n" +
    "    </td>\n" +
    "    <td>\n" +
    "      <img ng-src={{details.image1}} alt=\"No images were submitted\">\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "</table>\n" +
    "\n" +
    "<table class=\"table table-bordered table-hover\">\n" +
    "<h4>Submitter Information</h4>\n" +
    "  <tr>\n" +
    "    <td class=col-sm-2>\n" +
    "      Submitter:\n" +
    "    </td>\n" +
    "    <td>\n" +
    "    {{details.submitter}}\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "  <tr>\n" +
    "    <td>\n" +
    "      Submitter Email:\n" +
    "    </td>\n" +
    "    <td>\n" +
    "    <a href=mailto:{{details.submitterEmail}}>{{details.submitterEmail}}</a>\n" +
    "    </td>\n" +
    "  </tr>\n" +
    "</table>\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "  <form>\n" +
    "    <button type=button ng-show=nav.isAdmin() class=btn ng-click=deleteData() name=button>Delete</button>\n" +
    "    <button type=submit class=btn ng-click=updateVOC() name=button>Update</button>\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "<footer></footer></div>"
  );


  $templateCache.put('app/main/grid.html',
    "<navbar></navbar><br><br><div ng-controller=GridCtrl ng-init=refreshData()><div id=grid1 ui-grid=gridOptions ui-grid-cellnav ui-grid-edit ui-grid-resize-columns ui-grid-pinning ui-grid-selection ui-grid-move-columns ui-grid-exporter ui-grid-grouping ui-grid-pagination class=grid></div></div><footer></footer>"
  );


  $templateCache.put('app/main/logout.html',
    "<navbar></navbar><div class=container><h1>Logout Complete</h1><p>click login in the top right corner of the screen to login again</p></div><footer></footer>"
  );


  $templateCache.put('app/main/main.html',
    "<navbar></navbar><header class=hero-unit id=banner><div class=container><h1 class=mainHeader>WORLD CLASS SERVICE</h1><br><br><img class=\"img-responsive preventingImg\" src=assets/images/PreventingInjuriesLogo.png alt=\"Preventing Injuries, Saving Lives\"><br><p>by</p><br><img src=assets/images/header-logo.jpg alt=\"We are Little Giant\"></div></header><div class=container><div class=row><div class=col-lg-12><h1 class=page-header>Download the App!</h1><ul><li><a href=\"\">IOS</a></li><li><a href=\"\">Android</a></li></ul></div></div></div><footer></footer>"
  );


  $templateCache.put('app/main/welcome.html',
    "<navbar></navbar><div class=container id=background><div class=authorization ng-hide=\"user.role == 'user'\"><h4 class=welcomeMessage>{{user.name}}, welcome back!!!</h4><br><br><img class=img-thumbnail src=\"https://media.giphy.com/media/q6QHDGE3X4EWA/giphy.gif\"></div><div class=authorization ng-show=\"user.role == 'user'\"><h4 class=welcomeMessage>Thank you for signing up! The site admin is reviewing your status.</h4><br><br><img src=http://memecreator.org/static/images/memes/3899221.jpg class=img-thumbnail alt=\"Koalafications\"><br><br><h4 class=welcomeMessage>Once your connection with Little Giant Ladders has been verified you may visit other parts of website</h4></div></div><footer></footer>"
  );


  $templateCache.put('components/footer/footer.html',
    "<div class=container><p>Little Giant Ladder Systems © {{ date | date:'yyyy'}} | <a href=\"mailto:cody@ladders.com?Subject=World%20Class%20Service%20Desktop%20Site%20Bug\">bugs? Email me!</a> | <a href=https://www.littlegiantladders.com>Little Giant Ladders</a></p></div>"
  );


  $templateCache.put('components/modal/modal.html',
    "<div class=modal-header><button ng-if=modal.dismissable type=button ng-click=$dismiss() class=close>&times;</button><h4 ng-if=modal.title ng-bind=modal.title class=modal-title></h4></div><div class=modal-body><p ng-if=modal.text ng-bind=modal.text></p><div ng-if=modal.html ng-bind-html=modal.html></div></div><div class=modal-footer><button ng-repeat=\"button in modal.buttons\" ng-class=button.classes ng-click=button.click($event) ng-bind=button.text class=btn></button></div>"
  );


  $templateCache.put('components/navbar/navbar.html',
    "<div class=\"navbar navbar-default navbar-static-top\" ng-controller=NavbarController><div class=container><div class=navbar-header><button class=navbar-toggle type=button ng-click=\"nav.isCollapsed = !nav.isCollapsed\"><span class=sr-only>Toggle navigation</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button><!-- <img href=\"/\" class='navbar-brand' src=\"/assets/images/header-logo.jpg\" alt=\"\" /> --> <img class=navbar-brand src=/assets/images/header-logo.jpg alt=\"\"></div><div collapse=nav.isCollapsed class=\"navbar-collapse collapse\" id=navbar-main><ul class=\"nav navbar-nav\"><li ng-show=\"nav.isAdmin() || nav.isUser()\" ui-sref-active=active><a ui-sref=grid>Main View</a></li><li ng-show=\"nav.isAdmin() || nav.isUser()\" ui-sref-active=active><a ui-sref=customerService>Customer Service</a></li><li ng-show=nav.isAdmin() ui-sref-active=active><a ui-sref=admin>Admin</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li ng-hide=nav.isLoggedIn() ui-sref-active=active><a ui-sref=signup>Sign up</a></li><li ng-hide=nav.isLoggedIn() ui-sref-active=active><a ui-sref=login>Login</a></li><li ng-show=nav.isLoggedIn()><p class=navbar-text>Hello {{ nav.getCurrentUser().name }}</p></li><li ng-show=nav.isLoggedIn() ui-sref-active=active><a ui-sref=settings><span class=\"glyphicon glyphicon-cog\"></span></a></li><li ng-show=nav.isLoggedIn()><a ui-sref=logout>Logout</a></li></ul></div></div></div>"
  );

}]);
