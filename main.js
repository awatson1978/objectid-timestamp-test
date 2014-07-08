if(Meteor.isClient){
  Session.setDefault('recordsSearchFilter', '');

  Meteor.subscribe('records');

  Template.recordsListPage.helpers({
    recordsList: function(){
      return Records.find();
    }
  });
  Template.recordsListPage.events({
    'keyup #recordsSearchInput':function(){
      Session.set('recordsSearchFilter', $('#recordsSearchInput').val());
    },
    'click #addNewRecord':function(){
      Meteor.call('addRecord');
    },
    'click #clearRecords':function(){
      Meteor.call('dropRecords');
    }

  });
  Template.recordRow.helpers({
    getParseInt: function(){
      return new Date(parseInt(this._id._str.substring(0, 8), 16) * 1000);
    },
    getTimestamp: function(){
      return new Date(this._id.getTimestamp());
    },
    getCreated: function(){
      return new Date(parseInt(this._id._str.substring(0, 8), 16) * 1000);
    }
  });
}


Records =  new Meteor.Collection("records", {idGeneration: "TIMESTAMP"});

Records.allow({
  insert: function(){
    return true;
  },
  update: function () {
    return true;
  },
  remove: function(){
    return true;
  }
});

if(Meteor.isServer){
  Meteor.publish('records', function () {
    return Records.find();
  });
  Meteor.methods({
    'addRecord': function(){
      var index = Math.round(Math.random() * 20);

      data = [
        {"FirstName":"Cruz","LastName":"Roudabush","Company":"Meridian Products","Address":"2202 S Central Ave","City":"Phoenix","County":"Maricopa","State":"AZ","Zip":85004,"Phone":"602-252-4827","Fax":"602-252-4009","Email":"cruz@roudabush.com","Web":"http://www.cruzroudabush.com"},
        {"FirstName":"Billie","LastName":"Tinnes","Company":"D & M Plywood Inc","Address":"28 W 27th St","City":"New York","County":"New York","State":"NY","Zip":10001,"Phone":"212-889-5775","Fax":"212-889-5764","Email":"billie@tinnes.com","Web":"http://www.billietinnes.com"},
        {"FirstName":"Rosemarie","LastName":"Fifield","Company":"Technology Services","Address":"3131 N Nimitz Hwy  #-105","City":"Honolulu","County":"Honolulu","State":"HI","Zip":96819,"Phone":"808-836-8966","Fax":"808-836-6008","Email":"rosemarie@fifield.com","Web":"http://www.rosemariefifield.com"},
        {"FirstName":"Bernard","LastName":"Laboy","Company":"Century 21 Keewaydin Prop","Address":"22661 S Frontage Rd","City":"Channahon","County":"Will","State":"IL","Zip":60410,"Phone":"815-467-0487","Fax":"815-467-1244","Email":"bernard@laboy.com","Web":"http://www.bernardlaboy.com"},
        {"FirstName":"Sue","LastName":"Haakinson","Company":"Kim Peacock Beringhause","Address":"9617 N Metro Pky W","City":"Phoenix","County":"Maricopa","State":"AZ","Zip":85051,"Phone":"602-953-2753","Fax":"602-953-0355","Email":"sue@haakinson.com","Web":"http://www.suehaakinson.com"},
        {"FirstName":"Valerie","LastName":"Pou","Company":"Sea Port Record One Stop Inc","Address":"7475 Hamilton Blvd","City":"Trexlertown","County":"Lehigh","State":"PA","Zip":18087,"Phone":"610-395-8743","Fax":"610-395-6995","Email":"valerie@pou.com","Web":"http://www.valeriepou.com"},
        {"FirstName":"Lashawn","LastName":"Hasty","Company":"Kpff Consulting Engineers","Address":"815 S Glendora Ave","City":"West Covina","County":"Los Angeles","State":"CA","Zip":91790,"Phone":"626-960-6738","Fax":"626-960-1503","Email":"lashawn@hasty.com","Web":"http://www.lashawnhasty.com"},
        {"FirstName":"Marianne","LastName":"Earman","Company":"Albers Technologies Corp","Address":"6220 S Orange Blossom Trl","City":"Orlando","County":"Orange","State":"FL","Zip":32809,"Phone":"407-857-0431","Fax":"407-857-2506","Email":"marianne@earman.com","Web":"http://www.marianneearman.com"},
        {"FirstName":"Justina","LastName":"Dragaj","Company":"Uchner, David D Esq","Address":"2552 Poplar Ave","City":"Memphis","County":"Shelby","State":"TN","Zip":38112,"Phone":"901-327-5336","Fax":"901-327-2911","Email":"justina@dragaj.com","Web":"http://www.justinadragaj.com"},
        {"FirstName":"Mandy","LastName":"Mcdonnell","Company":"Southern Vermont Surveys","Address":"343 Bush St Se","City":"Salem","County":"Marion","State":"OR","Zip":97302,"Phone":"503-371-8219","Fax":"503-371-1118","Email":"mandy@mcdonnell.com","Web":"http://www.mandymcdonnell.com"},
        {"FirstName":"Conrad","LastName":"Lanfear","Company":"Kahler, Karen T Esq","Address":"49 Roche Way","City":"Youngstown","County":"Mahoning","State":"OH","Zip":44512,"Phone":"330-758-0314","Fax":"330-758-3536","Email":"conrad@lanfear.com","Web":"http://www.conradlanfear.com"},
        {"FirstName":"Cyril","LastName":"Behen","Company":"National Paper & Envelope Corp","Address":"1650 S Harbor Blvd","City":"Anaheim","County":"Orange","State":"CA","Zip":92802,"Phone":"714-772-5050","Fax":"714-772-3859","Email":"cyril@behen.com","Web":"http://www.cyrilbehen.com"},
        {"FirstName":"Tyree","LastName":"Courrege","Company":"Stitch Craft","Address":"13201 Northwest Fwy","City":"Houston","County":"Harris","State":"TX","Zip":77040,"Phone":"713-690-9216","Fax":"713-690-4043","Email":"tyree@courrege.com","Web":"http://www.tyreecourrege.com"},
        {"FirstName":"Ramon","LastName":"Amaral","Company":"Air Academy Federal Credit Un","Address":"700 W Highway 287","City":"Lander","County":"Fremont","State":"WY","Zip":82520,"Phone":"307-332-2667","Fax":"307-332-3893","Email":"ramon@amaral.com","Web":"http://www.ramonamaral.com"},
        {"FirstName":"Wilfredo","LastName":"Gidley","Company":"Mclaughlin, John F Esq","Address":"2255 Kuhio Ave  #-1203","City":"Honolulu","County":"Honolulu","State":"HI","Zip":96815,"Phone":"808-924-2610","Fax":"808-924-7666","Email":"wilfredo@gidley.com","Web":"http://www.wilfredogidley.com"},
        {"FirstName":"Gracie","LastName":"Ehn","Company":"P C Systems","Address":"Kahala","City":"Honolulu","County":"Honolulu","State":"HI","Zip":96816,"Phone":"808-247-8624","Fax":"808-247-7982","Email":"gracie@ehn.com","Web":"http://www.gracieehn.com"},
        {"FirstName":"Dorthy","LastName":"Alexy","Company":"Frank Siviglia & Co","Address":"Pearlridge","City":"Aiea","County":"Honolulu","State":"HI","Zip":96701,"Phone":"808-247-4421","Fax":"808-247-7192","Email":"dorthy@alexy.com","Web":"http://www.dorthyalexy.com"},
        {"FirstName":"Bertie","LastName":"Luby","Company":"Puckett, Dennis L Esq","Address":"Windward","City":"Kaneohe","County":"Honolulu","State":"HI","Zip":96744,"Phone":"808-247-8062","Fax":"808-247-2529","Email":"bertie@luby.com","Web":"http://www.bertieluby.com"},
        {"FirstName":"Rudy","LastName":"Kuhle","Company":"General Insurcorp Inc","Address":"1418 3rd Ave","City":"New York","County":"New York","State":"NY","Zip":10028,"Phone":"212-628-9987","Fax":"212-628-1234","Email":"rudy@kuhle.com","Web":"http://www.rudykuhle.com"},
        {"FirstName":"Gale","LastName":"Nolau","Company":"Lust, C James Esq","Address":"104 N Aurora St","City":"Ithaca","County":"Tompkins","State":"NY","Zip":14850,"Phone":"607-277-1567","Fax":"607-277-6524","Email":"gale@nolau.com","Web":"http://www.galenolau.com"}
        ];

      Records.insert({
        FirstName:   data[index].FirstName,
        LastName:  data[index].LastName,
        Company:  data[index].Company,
        Zip:  data[index].Zip
      });
    },
    'dropRecords':function(){
      Records.find().forEach(function(record){
        Records.remove({_id: record._id});
      });
    }
  });

}
