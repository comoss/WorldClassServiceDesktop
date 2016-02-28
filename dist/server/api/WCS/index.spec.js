'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var WCSCtrlStub = {
  index: 'WCSCtrl.index',
  show: 'WCSCtrl.show',
  create: 'WCSCtrl.create',
  update: 'WCSCtrl.update',
  destroy: 'WCSCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  'delete': sinon.spy()
};

// require the index with our stubbed out modules
var WCSIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './WCS.controller': WCSCtrlStub
});

describe('WCS API Router:', function () {

  it('should return an express router instance', function () {
    WCSIndex.should.equal(routerStub);
  });

  describe('GET /api/WCS', function () {

    it('should route to WCS.controller.index', function () {
      routerStub.get.withArgs('/', 'WCSCtrl.index').should.have.been.calledOnce;
    });
  });

  describe('GET /api/WCS/:id', function () {

    it('should route to WCS.controller.show', function () {
      routerStub.get.withArgs('/:id', 'WCSCtrl.show').should.have.been.calledOnce;
    });
  });

  describe('POST /api/WCS/', function () {

    it('should route to WCS.controller.create', function () {
      routerStub.post.withArgs('/', 'WCSCtrl.create').should.have.been.calledOnce;
    });
  });

  describe('PUT /api/WCS/:id', function () {

    it('should route to WCS.controller.update', function () {
      routerStub.put.withArgs('/:id', 'WCSCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/WCS/:id', function () {

    it('should route to WCS.controller.update', function () {
      routerStub.patch.withArgs('/:id', 'WCSCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/WCS/:id', function () {

    it('should route to WCS.controller.destroy', function () {
      routerStub['delete'].withArgs('/:id', 'WCSCtrl.destroy').should.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
