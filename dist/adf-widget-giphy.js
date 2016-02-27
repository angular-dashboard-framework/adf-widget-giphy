(function(window, undefined) {'use strict';
/*
 * The MIT License
 *
 * Copyright (c) 2016, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



angular
  .module('adf.widget.giphy', [
    'adf.provider'
  ]);

angular.module("adf.widget.giphy").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/giphy/src/views/edit.html","<form role=form><div class=form-group><label for=sample>Tag</label> <input type=text class=form-control id=tag ng-model=config.tag placeholder=\"Enter tag\"></div></form>");
$templateCache.put("{widgetsPath}/giphy/src/views/view.html","<div><a ng-show=vm.gif target=_blank href={{vm.gif.url}}><img src={{vm.gif.image_url}} alt=\"random gif image\" class=\"img-responsive img-thumbnail\"></a><div ng-show=!vm.gif class=\"alert alert-warning\">Could not find gifs with the tag {{config.tag}}</div></div>");}]);
/*
 * The MIT License
 *
 * Copyright (c) 2016, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



angular
  .module('adf.widget.giphy')
  .config(RegisterWidget);

function RegisterWidget(dashboardProvider){
  dashboardProvider
    .widget('giphy', {
      title: 'Giphy',
      description: 'Display random gif pictures from giphy',
      templateUrl: '{widgetsPath}/giphy/src/views/view.html',
      resolve: {
        gif: ["giphyService", "config", function(giphyService, config){
          return giphyService.random(config.tag);
        }]
      },
      reload: true,
      controller: 'GiphyController',
      controllerAs: 'vm',
      edit: {
        templateUrl: '{widgetsPath}/giphy/src/views/edit.html'
      }
    });
}
RegisterWidget.$inject = ["dashboardProvider"];

/*
 * The MIT License
 *
 * Copyright (c) 2016, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



angular
  .module('adf.widget.giphy')
  .factory('giphyService', GiphyService)
  .constant('giphyApiUrl', 'http://api.giphy.com/v1/gifs/')
  // TODO replace with real api key
  .constant('giphyApiKey', 'dc6zaTOxFJmzC');

function GiphyService($http, giphyApiUrl, giphyApiKey){

  function random(tag){
    var params = {
      'api_key': giphyApiKey
    };

    if (tag){
      params.tag = tag;
    }

    return $http({
      url: giphyApiUrl + 'random',
      method: 'GET',
      params: params
    }).then(function(response){
      return response.data.data;
    });
  }

  return {
    random: random
  };
}
GiphyService.$inject = ["$http", "giphyApiUrl", "giphyApiKey"];

/*
 * The MIT License
 *
 * Copyright (c) 2016, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



angular
  .module('adf.widget.giphy')
  .controller('GiphyController', GiphyController);

function GiphyController(gif){
  var vm = this;

  vm.gif = gif;
}
GiphyController.$inject = ["gif"];
})(window);