'use strict';
var assert = require('assert');

var LuceneClient = require('lucene-baratine-client');

describe('Lucene Baratine Client', function ()
{
  describe('LuceneClient', function ()
  {
    it('should accept url as parameter', function ()
    {
      var url = "http://localhost:8085/lucene";
      var lucene = new LuceneClient(url);
      assert.notEqual(lucene.client, undefined);
    });
  });

  describe('LuceneClient', function ()
  {
    it('should be able to add text to index', function (done)
    {
      var url = "ws://localhost:8085/s/lucene";
      var lucene = new LuceneClient(url);

      lucene.indexText("foo", "my-ext-id", "Mary had a little lamb");

      var callback = function (ids)
      {
        assert.deepEqual(ids, ["my-ext-id"]);

        done();
      };

      lucene.search("foo", "lamb", 255, callback);
    });
  });

  describe('LuceneClient', function ()
  {
    it('should be able to add map to index', function (done)
    {
      var url = "ws://localhost:8085/s/lucene";

      var lucene = new LuceneClient(url);

      var map = {barn:"lamb", house:"cat"};

      lucene.indexMap("foo", "my-ext-map-id", map);

      var callback = function (ids)
      {
        assert.deepEqual(ids, ["my-ext-map-id"]);

        done();
      };

      lucene.search("foo", "barn:lamb", 255, callback);
    });
  });

  describe('LuceneClient', function ()
  {
    it('should be able to clear index', function (done)
    {
      var url = "ws://localhost:8085/s/lucene";

      var lucene = new LuceneClient(url);

      var map = {barn:"lamb", house:"cat"};

      lucene.indexMap("foo", "my-ext-map-id", map);
      lucene.clear("foo");

      var callback = function (ids)
      {
        assert.deepEqual(ids, []);

        done();
      };

      lucene.search("foo", "barn:lamb", 255, callback);
    });
  });
});
