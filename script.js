(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_DED95086_CFDA_B5B9_41E1_B6DCE9E8C4EA]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_679D1E20_7179_CC6A_41CF_662941DB817D].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "width": "100%",
 "vrPolyfillScale": 0.5,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "class": "Player",
 "children": [
  "this.MainViewer",
  "this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541",
  "this.Image_662ED9D9_7178_37D1_41BC_B29C3F34DB16",
  "this.Container_6792CE20_7179_CC6A_41D0_E818C4D261B5",
  "this.Container_C6C04894_C81E_A06E_41E2_CFA3F601EC35",
  "this.veilPopupPanorama",
  "this.zoomImagePopupPanorama",
  "this.closeButtonPopupPanorama"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "backgroundPreloadEnabled": true,
 "minHeight": 20,
 "scripts": {
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "unregisterKey": function(key){  delete window[key]; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "existsKey": function(key){  return key in window; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getKey": function(key){  return window[key]; }
 },
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "buttonToggleFullscreen": "this.IconButton_679D1E20_7179_CC6A_41CF_662941DB817D",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "downloadEnabled": true,
 "gap": 10,
 "layout": "absolute",
 "height": "100%",
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0",
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "data": {
  "name": "Player18184"
 },
 "overflow": "visible",
 "definitions": [{
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Street VieXCw 360",
 "id": "panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9",
 "thumbnailUrl": "media/panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "150%"
},
{
 "items": [
  {
   "media": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C",
   "player": "this.viewer_uidE5FEB530_F6B7_CDA1_41E0_4CA50E0EDB58PanoPlayer",
   "camera": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5FD7530_F6B7_CDA1_41ED_ED27B71703F6",
 "class": "PlayList"
},
{
 "label": "video_77971F4C_67B3_362C_41D0_6D5F39F7A280",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC_t.jpg",
 "width": 2986,
 "loop": false,
 "id": "video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC",
 "class": "Video",
 "height": 1680,
 "video": {
  "width": 2986,
  "class": "VideoResource",
  "height": 1680,
  "mp4Url": "media/video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC.mp4"
 }
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window3767"
 },
 "bodyPaddingRight": 0,
 "id": "window_CAEAFA9A_C558_B9CA_41D9_0CD75738D73C",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5FE5530_F6B7_CDA1_41E2_545226200AA4"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "Street VieXCw 360",
 "id": "panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE",
 "thumbnailUrl": "media/panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C.ogg"
 },
 "class": "MediaAudio",
 "id": "audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C",
 "data": {
  "label": "ElevenLabs_2024-09-05T00_33_31_Charlie_pre_s100_sb75_se0_b_m2"
 }
},
{
 "items": [
  {
   "media": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "camera": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "camera": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "camera": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "camera": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "camera": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "camera": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "camera": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 7, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 7)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "camera": "this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.video_AB72F879_BE95_7D22_41D9_61CE633D38DD",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 9, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 9)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "camera": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "camera": "this.panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "camera": "this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "camera": "this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "camera": "this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "camera": "this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "camera": "this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "camera": "this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9",
   "end": "this.trigger('tourEnded')",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 0)",
   "camera": "this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_camera",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 17.07,
   "backwardYaw": 173.16,
   "distance": 1,
   "panorama": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -98.16,
   "backwardYaw": -92.13,
   "distance": 1,
   "panorama": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "5",
 "id": "panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD",
 "thumbnailUrl": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360,
 "hfovMax": 150,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A0EF30B3_BF72_1976_41BC_B16DDEE112D3",
  "this.overlay_A1D596B1_BF75_F975_41E5_161D6B995BAA",
  "this.overlay_9ADC8EA8_BF72_2913_41E0_6B8608E63068",
  "this.popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C",
  "this.overlay_9DE28A0A_BF6E_2916_41CD_9171EAA1F0AF",
  "this.popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF",
  "this.overlay_9C2C01F1_BF6E_3AF2_41C8_C58DC783679D",
  "this.popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2",
  "this.overlay_90C45A72_BFF2_69F6_41C5_5E2F51F26185"
 ]
},
{
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonPressedIconColor": "#888888",
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "Window390"
 },
 "bodyPaddingRight": 0,
 "id": "window_FCDC1E4D_F6B1_5FE2_41E5_C33C370A6A66",
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "bodyBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "closeButtonPaddingTop": 5,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "scrollBarOpacity": 0.5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 0,
 "closeButtonBackgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowVerticalLength": 0,
 "closeButtonRollOverIconLineWidth": 5,
 "backgroundOpacity": 1,
 "closeButtonPressedIconLineWidth": 5,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "closeButtonRollOverBorderSize": 0,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5E30538_F6B7_CDA1_41E3_54A210BFE6BE"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundOpacity": 0.3,
 "closeButtonIconColor": "#000000",
 "shadowHorizontalLength": 3,
 "closeButtonBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "closeButtonPaddingRight": 5,
 "scrollBarMargin": 2,
 "closeButtonPaddingLeft": 5,
 "closeButtonPaddingBottom": 5,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonBorderRadius": 0,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "layout": "vertical",
 "closeButtonPressedBorderColor": "#000000",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "headerBackgroundOpacity": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 5,
 "paddingBottom": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#666666",
 "paddingTop": 0,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "closeButtonPressedBorderSize": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 9.02,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_camera",
 "manualRotationSpeed": 612,
 "initialPosition": {
  "hfov": 101,
  "yaw": 80.08,
  "pitch": -2.14,
  "class": "PanoramaCameraPosition"
 }
},
{
 "items": [
  {
   "media": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116",
   "player": "this.viewer_uidE5F3A52D_F6B7_CDA3_41DB_A9B39342938FPanoPlayer",
   "camera": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5F1752C_F6B7_CDA1_41DF_C9BA8DEFEC44",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 0, 1)",
   "camera": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 1, 2)",
   "camera": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 2, 3)",
   "camera": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 3, 4)",
   "camera": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 4, 5)",
   "camera": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist, 5, 0)",
   "camera": "this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_camera",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.08,
 "hideDuration": 500,
 "yaw": 76.93,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465",
 "image": {
  "levels": [
   {
    "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_3.jpg",
    "width": 666,
    "height": 1024,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -7.66,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 20.85,
 "hideDuration": 500,
 "yaw": -169.57,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2",
 "image": {
  "levels": [
   {
    "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_4.jpg",
    "width": 1024,
    "height": 767,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 0.69,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "id": "ImageResource_A94824E1_BEE1_B065_41CC_505D04DA2E35",
 "levels": [
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_0.jpg",
   "width": 13013,
   "height": 17751,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_1.jpg",
   "width": 12010,
   "height": 16384,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_2.jpg",
   "width": 6005,
   "height": 8192,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_3.jpg",
   "width": 3002,
   "height": 4096,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_4.jpg",
   "width": 1501,
   "height": 2048,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_5.jpg",
   "width": 750,
   "height": 1024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_6.jpg",
   "width": 375,
   "height": 512,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 39.89,
   "backwardYaw": -7.66,
   "distance": 1,
   "panorama": "this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": 125.22,
   "backwardYaw": -104.33,
   "distance": 1,
   "panorama": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "1",
 "id": "panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525",
 "thumbnailUrl": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360,
 "hfovMax": 150,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_B0D42CA9_BE75_9525_41DF_01C3AA07CDEE",
  "this.overlay_B1FED0EE_BE76_8D3F_41A8_6CA6EB70BB0E",
  "this.overlay_D1E3752E_C548_A8CA_41D7_562CC9728E8B"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_B5E53D8C_BF2E_2B13_41E5_516239E7C8BE_camera",
 "initialPosition": {
  "hfov": 103,
  "yaw": 87.93,
  "pitch": 5.87,
  "class": "PanoramaCameraPosition"
 }
},
{
 "adjacentPanoramas": [
  {
   "yaw": -92.13,
   "backwardYaw": -98.16,
   "distance": 1,
   "panorama": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "6",
 "id": "panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC",
 "thumbnailUrl": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360,
 "hfovMax": 150,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A18AC4B2_BF76_1976_41C1_3449A2C14288",
  "this.overlay_99A56090_BF32_3932_4181_B8C673A66BE9",
  "this.popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5",
  "this.popup_936400A0_BF3E_7912_41D9_2DED96CB6E81",
  "this.overlay_91E59851_BF2D_E932_4185_722D58DF4B27",
  "this.overlay_DDC6386A_CD05_0C99_41DF_B08A4474BEE0"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E29F65DF_F6B7_CC9F_41A5_BE6BD8AB58B9",
 "initialPosition": {
  "hfov": 84,
  "yaw": -6.84,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E55A95AA_F6B7_CCA1_4199_6A11AC1021CE",
 "initialPosition": {
  "hfov": 103,
  "yaw": 81.84,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A.ogg"
 },
 "class": "MediaAudio",
 "id": "audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A",
 "data": {
  "label": "ElevenLabs_2024-09-04T20_00_48_Charlie_pre_s100_sb75_se0_b_m2"
 }
},
{
 "id": "ImageResource_CA1DDD68_C55B_5B76_41E1_7549F89DFD79",
 "levels": [
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_0.jpg",
   "width": 12089,
   "height": 9067,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_1.jpg",
   "width": 8192,
   "height": 6144,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_2.jpg",
   "width": 4096,
   "height": 3072,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_3.jpg",
   "width": 2048,
   "height": 1536,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_4.jpg",
   "width": 1024,
   "height": 768,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_5.jpg",
   "width": 512,
   "height": 384,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "items": [
  {
   "media": "this.video_9108967E_BF32_19EE_41E4_201CC3FF17B4",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_E5EC1539_F6B7_CDA3_41E3_C7620E90E7DD, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_E5EC1539_F6B7_CDA3_41E3_C7620E90E7DD, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "playList_E5EC1539_F6B7_CDA3_41E3_C7620E90E7DD",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_camera",
 "initialPosition": {
  "hfov": 114,
  "yaw": -1.42,
  "pitch": 4.31,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E54925B6_F6B7_CCA1_41DA_C53548869275",
 "initialPosition": {
  "hfov": 84,
  "yaw": 172.34,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "id": "ImageResource_E526B55F_F6B7_CD9F_41A8_83E96D32AC51",
 "levels": [
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_0.jpg",
   "width": 12800,
   "height": 17474,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_1.jpg",
   "width": 12001,
   "height": 16384,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_2.jpg",
   "width": 6000,
   "height": 8192,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_3.jpg",
   "width": 3000,
   "height": 4096,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_4.jpg",
   "width": 1500,
   "height": 2048,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_5.jpg",
   "width": 750,
   "height": 1024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_6.jpg",
   "width": 375,
   "height": 512,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "label": "video_7F40EE64_6E46_44D3_41D5_7C5E3BFDD79E",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_AB72F879_BE95_7D22_41D9_61CE633D38DD_t.jpg",
 "width": 2986,
 "loop": false,
 "id": "video_AB72F879_BE95_7D22_41D9_61CE633D38DD",
 "class": "Video",
 "height": 1680,
 "video": {
  "width": 2986,
  "class": "VideoResource",
  "height": 1680,
  "mp4Url": "media/video_AB72F879_BE95_7D22_41D9_61CE633D38DD.mp4"
 }
},
{
 "items": [
  {
   "media": "this.video_92B5B1ED_BF32_1B12_41AC_845335AD02C7",
   "start": "this.viewer_uidE5E30538_F6B7_CDA1_41E3_54A210BFE6BEVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_E5D8C545_F6B7_CDE3_41E2_B925A464E6C9, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_E5D8C545_F6B7_CDE3_41E2_B925A464E6C9, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidE5E30538_F6B7_CDA1_41E3_54A210BFE6BEVideoPlayer)",
   "player": "this.viewer_uidE5E30538_F6B7_CDA1_41E3_54A210BFE6BEVideoPlayer"
  }
 ],
 "id": "PlayList_E5D8C545_F6B7_CDE3_41E2_B925A464E6C9",
 "class": "PlayList"
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "parque fernandez madrid",
 "id": "panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC",
 "thumbnailUrl": "media/panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "rotationY": 0,
 "yaw": 3.12,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 50.21,
 "autoplay": true,
 "id": "popup_936400A0_BF3E_7912_41D9_2DED96CB6E81",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "pitch": 0.69,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "hideDuration": 500,
 "popupDistance": 100,
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_92B5B1ED_BF32_1B12_41AC_845335AD02C7.mp4"
 }
},
{
 "from": "top",
 "duration": 100,
 "id": "effect_66563DD8_7178_4FDA_41D7_8C4F9A40867B",
 "easing": "linear",
 "class": "SlideInEffect"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 66.09,
 "hideDuration": 500,
 "yaw": 89.52,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377",
 "image": {
  "levels": [
   {
    "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_4.jpg",
    "width": 1024,
    "height": 767,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 2.54,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 9.02,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E56B759D_F6B7_CD63_41A4_5F6B8298A24C",
 "manualRotationSpeed": 612,
 "initialPosition": {
  "hfov": 101,
  "yaw": -140.11,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonPressedIconColor": "#888888",
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "Window412"
 },
 "bodyPaddingRight": 0,
 "id": "window_FD9D7012_F6B1_4361_41EC_7DC37192CED3",
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "bodyBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "closeButtonPaddingTop": 5,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "scrollBarOpacity": 0.5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 0,
 "closeButtonBackgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowVerticalLength": 0,
 "closeButtonRollOverIconLineWidth": 5,
 "backgroundOpacity": 1,
 "closeButtonPressedIconLineWidth": 5,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "closeButtonRollOverBorderSize": 0,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5F3752E_F6B7_CDA1_41D8_C751C98EF555"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundOpacity": 0.3,
 "closeButtonIconColor": "#000000",
 "shadowHorizontalLength": 3,
 "closeButtonBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "closeButtonPaddingRight": 5,
 "scrollBarMargin": 2,
 "closeButtonPaddingLeft": 5,
 "closeButtonPaddingBottom": 5,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonBorderRadius": 0,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "layout": "vertical",
 "closeButtonPressedBorderColor": "#000000",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "headerBackgroundOpacity": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 5,
 "paddingBottom": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#666666",
 "paddingTop": 0,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "closeButtonPressedBorderSize": 0
},
{
 "id": "ImageResource_AADB0D2E_BF35_EB6F_41E1_A71D8747E3ED",
 "levels": [
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_0.jpg",
   "width": 9815,
   "height": 7043,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_1.jpg",
   "width": 8192,
   "height": 5878,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_2.jpg",
   "width": 4096,
   "height": 2939,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_3.jpg",
   "width": 2048,
   "height": 1469,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_4.jpg",
   "width": 1024,
   "height": 734,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_5.jpg",
   "width": 512,
   "height": 367,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 39.84,
 "hideDuration": 500,
 "yaw": 88.04,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5",
 "image": {
  "levels": [
   {
    "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_3.jpg",
    "width": 1024,
    "height": 725,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 0.46,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "la ermita",
 "id": "panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669",
 "thumbnailUrl": "media/panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "rotationY": 0,
 "yaw": 90.13,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.24,
 "autoplay": true,
 "id": "popup_CAE3408C_C558_E9CE_41D2_099A88CECC9A",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "pitch": -22.86,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "hideDuration": 500,
 "popupDistance": 100,
 "video": {
  "width": 2986,
  "class": "VideoResource",
  "height": 1680,
  "mp4Url": "media/video_AB72F879_BE95_7D22_41D9_61CE633D38DD.mp4"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E2AF75D0_F6B7_CCE1_41C7_FD2B665DF2B8",
 "initialPosition": {
  "hfov": 106,
  "yaw": -91.52,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window29434"
 },
 "bodyPaddingRight": 0,
 "id": "window_A474FCEC_BEB2_ACC6_41CB_181217D91186",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5E52535_F6B7_CDA3_41E7_35D9B3D40536"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_camera",
 "initialPosition": {
  "hfov": 103,
  "yaw": 150.93,
  "pitch": -3.42,
  "class": "PanoramaCameraPosition"
 }
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 51.99,
 "hideDuration": 500,
 "yaw": 89.18,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71",
 "image": {
  "levels": [
   {
    "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_4.jpg",
    "width": 1024,
    "height": 767,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 0.61,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "id": "ImageResource_AAD43D2D_BF35_EB6D_41DF_4066860A658B",
 "levels": [
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_0.jpg",
   "width": 10200,
   "height": 13969,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_1.jpg",
   "width": 5981,
   "height": 8192,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_2.jpg",
   "width": 2990,
   "height": 4096,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_3.jpg",
   "width": 1495,
   "height": 2048,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_4.jpg",
   "width": 747,
   "height": 1024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_5.jpg",
   "width": 373,
   "height": 512,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "id": "ImageResource_AAD52D2C_BF35_EB13_41C8_6FB4CC88898E",
 "levels": [
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_0.jpg",
   "width": 4267,
   "height": 2944,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_1.jpg",
   "width": 4096,
   "height": 2826,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_2.jpg",
   "width": 2048,
   "height": 1413,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_3.jpg",
   "width": 1024,
   "height": 706,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_4.jpg",
   "width": 512,
   "height": 353,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window25829"
 },
 "bodyPaddingRight": 0,
 "id": "window_A7F7142D_BEB6_B346_41DE_160664B2D89C",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5FAC534_F6B7_CDA1_41E7_5F9467DE0695"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "bodyBorderSize": 0,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "footerBorderColor": "#000000",
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "bodyBorderColor": "#000000",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "footerBorderSize": 0
},
{
 "id": "popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A",
 "hfov": 7.93,
 "image": {
  "levels": [
   {
    "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_0_4.jpg",
    "width": 1024,
    "height": 734,
    "class": "ImageResourceLevel"
   },
   {
    "url": "media/popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A_1_5.jpg",
    "width": 750,
    "height": 1024,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "class": "PopupPanoramaOverlay",
 "rotationX": 0,
 "rotationY": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "pitch": 2.11,
 "hideDuration": 500,
 "yaw": 109.77,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 12.16,
 "hideDuration": 500,
 "yaw": 61.33,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_CA352DA7_C549_BBFA_41E6_161386B7E332",
 "image": {
  "levels": [
   {
    "url": "media/popup_CA352DA7_C549_BBFA_41E6_161386B7E332_0_1.jpg",
    "width": 1023,
    "height": 409,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -27.87,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "id": "ImageResource_A9CC5FAA_BEF2_9327_41B7_FE8E120DE5C2",
 "levels": [
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_0.jpg",
   "width": 8651,
   "height": 6487,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_1.jpg",
   "width": 8192,
   "height": 6142,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_2.jpg",
   "width": 4096,
   "height": 3071,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_3.jpg",
   "width": 2048,
   "height": 1535,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_4.jpg",
   "width": 1024,
   "height": 767,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377_0_5.jpg",
   "width": 512,
   "height": 383,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window30372"
 },
 "bodyPaddingRight": 0,
 "id": "window_A44997AA_BEB2_BD4D_41B0_33A1398521F4",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5E69535_F6B7_CDA3_41DD_289BA50156CA"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 9.02,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 9.02,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E5755584_F6B7_CD61_41E4_9F53F70B53A7",
 "manualRotationSpeed": 612,
 "initialPosition": {
  "hfov": 101,
  "yaw": -54.78,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "viewerArea": "this.MainViewer",
 "id": "MainViewerVideoPlayer",
 "displayPlaybackBar": true,
 "class": "VideoPlayer"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -89,
   "backwardYaw": 88.48,
   "distance": 1,
   "panorama": "this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "3",
 "id": "panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4",
 "thumbnailUrl": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360,
 "hfovMax": 150,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_ABB4B996_BEF5_9FEF_41C0_2F1A7275D166",
  "this.popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377",
  "this.overlay_A319A6B7_BEF2_B52D_41D3_27F004D737D3",
  "this.overlay_A5E2BE86_BEFE_B5EF_41D9_F30BDE3E73E5",
  "this.overlay_A7785CB2_BEFE_F526_41D5_693CD3F417C0",
  "this.overlay_A40D28B6_BEFD_7D2F_41E0_3EF222D5DF50",
  "this.overlay_A674DDA4_BEFD_B723_41E6_6E125AE567D8",
  "this.overlay_A7336DD3_BEF2_9765_41E6_9E7C98C69EA8",
  "this.overlay_A90D73E4_BEF3_7323_41E7_57CE3A611FE7",
  "this.overlay_A614A866_BEF3_9D2F_41CC_7D20C75E9AC4",
  "this.overlay_A74F4B8C_BEF2_B3E3_419C_8819A5EBF662",
  "this.overlay_A6EBB5B7_BEF2_B72D_41E0_5F90A6264D7B",
  "this.overlay_A6D7CA14_BEF6_BCE3_41C6_D9A8B8021E25",
  "this.overlay_A79A7AF3_BEF6_9D25_41C4_10E641F9B442",
  "this.overlay_A9470ABB_BEF6_9D25_41E1_BFEC9F22709F",
  "this.overlay_A62A556F_BEF5_973E_41A8_3FA74B909572",
  "this.overlay_A722CBAE_BEF5_F33F_41E2_7CD2EE811F9A",
  "this.overlay_A9056E81_BEF5_95E5_41E0_A94A278C8589",
  "this.overlay_A6D0E2DE_BEF5_8D1F_41E0_F4CC9E3A1D41",
  "this.overlay_A6571966_BEF5_7F2F_41D2_CE07DB193AAA",
  "this.popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC",
  "this.popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465",
  "this.popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A",
  "this.popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2",
  "this.popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D",
  "this.popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875",
  "this.popup_ACE1D66D_BF21_B062_41CE_710F156150BA",
  "this.popup_A904160D_BF21_53BD_41CD_A66E25EE7D42",
  "this.popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A",
  "this.popup_A62E6F27_BF33_E71E_414D_7F4159A130D3",
  "this.overlay_A0A7BB52_BF76_2F36_41D0_41B67BD7E48A"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669",
   "player": "this.viewer_uidE5FAC534_F6B7_CDA1_41E7_5F9467DE0695PanoPlayer",
   "camera": "this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5FAF533_F6B7_CDA7_41EB_9753F03C9B4E",
 "class": "PlayList"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_B2EEA171_BFED_65BB_41D3_9F6255B03B1E.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_B2EEA171_BFED_65BB_41D3_9F6255B03B1E.ogg"
 },
 "class": "MediaAudio",
 "id": "audio_B2EEA171_BFED_65BB_41D3_9F6255B03B1E",
 "data": {
  "label": "relaxing-music-vol1-124477 (mp3cut.net)"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_AA2A4656_BEB6_956F_415A_37CC95040116_camera",
 "initialPosition": {
  "hfov": 94,
  "yaw": 0.86,
  "pitch": 8.44,
  "class": "PanoramaCameraPosition"
 }
},
{
 "adjacentPanoramas": [
  {
   "yaw": 88.48,
   "backwardYaw": -89,
   "distance": 1,
   "panorama": "this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -104.33,
   "backwardYaw": 125.22,
   "distance": 1,
   "panorama": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "2",
 "id": "panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583",
 "thumbnailUrl": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360,
 "hfovMax": 150,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_CAC67DCD_C549_BB4E_41C5_3CF13C58EEDB",
  "this.overlay_CABE589A_C547_79CA_41E8_391573AB0C7A",
  "this.overlay_CAE19CF2_C547_D955_41D9_9112F9CEC59E",
  "this.overlay_D5C829C0_C547_5BB6_41E1_0C9B58377FB2",
  "this.overlay_CA9510AC_C558_E9CE_41C3_A41D5EF48930",
  "this.overlay_CA933A5B_C559_B94B_41DC_B587DA0D153D",
  "this.overlay_CA0B160C_C558_A8CE_41D1_FE8D55B30963",
  "this.overlay_CA8B0AD6_C558_B95D_41E4_58F264E4C75B",
  "this.overlay_CA589D5A_C55B_BB4A_41E3_4F4E800E94EA",
  "this.overlay_CAFD7E23_C55B_58FA_41D3_0CC50F82DA5A",
  "this.overlay_CA7DF477_C559_695B_41DD_EC1D84E678D4",
  "this.overlay_CA35DD8A_C55B_5BCA_41E7_0DCC2394A201",
  "this.popup_CA352DA7_C549_BBFA_41E6_161386B7E332",
  "this.popup_CAEFACD1_C547_D957_41D6_AE6C75408208",
  "this.popup_CAE3408C_C558_E9CE_41D2_099A88CECC9A",
  "this.popup_CA43744F_C559_694A_41E3_6A94DB282096",
  "this.popup_CA122D68_C55B_5B76_41BC_163ECE009C39",
  "this.overlay_D140E706_C579_68BA_41E3_CE7135259DF3"
 ]
},
{
 "items": [
  {
   "media": "this.video_92B5B1ED_BF32_1B12_41AC_845335AD02C7",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_E5EC3539_F6B7_CDA3_41E3_15A80CFE5DAD, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_E5EC3539_F6B7_CDA3_41E3_15A80CFE5DAD, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "playList_E5EC3539_F6B7_CDA3_41E3_15A80CFE5DAD",
 "class": "PlayList"
},
{
 "label": "video",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_92B5B1ED_BF32_1B12_41AC_845335AD02C7_t.jpg",
 "width": 1920,
 "loop": false,
 "id": "video_92B5B1ED_BF32_1B12_41AC_845335AD02C7",
 "class": "Video",
 "height": 1080,
 "video": {
  "width": 1920,
  "class": "VideoResource",
  "height": 1080,
  "mp4Url": "media/video_92B5B1ED_BF32_1B12_41AC_845335AD02C7.mp4"
 }
},
{
 "id": "ImageResource_9860F25C_BF52_1932_41C2_F37C30930EC7",
 "levels": [
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_0.jpg",
   "width": 8651,
   "height": 6487,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_1.jpg",
   "width": 8192,
   "height": 6142,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_2.jpg",
   "width": 4096,
   "height": 3071,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_3.jpg",
   "width": 2048,
   "height": 1535,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_4.jpg",
   "width": 1024,
   "height": 767,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_5.jpg",
   "width": 512,
   "height": 383,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "id": "ImageResource_CA43544F_C559_694A_41B9_3C1104FC2891",
 "levels": [
  {
   "url": "media/popup_CA43744F_C559_694A_41E3_6A94DB282096_0_0.jpg",
   "width": 1187,
   "height": 1600,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_CA43744F_C559_694A_41E3_6A94DB282096_0_1.jpg",
   "width": 759,
   "height": 1024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_CA43744F_C559_694A_41E3_6A94DB282096_0_2.jpg",
   "width": 379,
   "height": 512,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window14104"
 },
 "bodyPaddingRight": 0,
 "id": "window_CA9B483E_C547_78CA_41D2_B4025CE0C701",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5F3A52D_F6B7_CDA3_41DB_A9B39342938F"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "items": [
  {
   "media": "this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92",
   "player": "this.viewer_uidE5E65536_F6B7_CDA1_41D6_76E00DF0487DPanoPlayer",
   "camera": "this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5E61536_F6B7_CDA1_41EE_657DBEAF6F02",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 8.23,
 "hideDuration": 500,
 "yaw": 84.88,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2",
 "image": {
  "levels": [
   {
    "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_3.jpg",
    "width": 1024,
    "height": 650,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -8.04,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_camera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "id": "ImageResource_93E5035B_BF3E_1F36_41E4_02AC12C6A6B2",
 "levels": [
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_0.jpg",
   "width": 6275,
   "height": 4446,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_1.jpg",
   "width": 4096,
   "height": 2902,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_2.jpg",
   "width": 2048,
   "height": 1451,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_3.jpg",
   "width": 1024,
   "height": 725,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5_0_4.jpg",
   "width": 512,
   "height": 362,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/u/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/r/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/b/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/d/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_0/l/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "Street View 360",
 "id": "panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C",
 "thumbnailUrl": "media/panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E5068578_F6B7_CDA1_41C1_723DD080CD5E",
 "initialPosition": {
  "hfov": 91,
  "yaw": 91,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/u/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/r/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/b/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/d/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_0/l/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "casa niza",
 "id": "panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98",
 "thumbnailUrl": "media/panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "items": [
  {
   "media": "this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98",
   "player": "this.viewer_uidE5E41535_F6B7_CDA3_41D6_C151FA10190APanoPlayer",
   "camera": "this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5E4F535_F6B7_CDA3_41E0_BBB3E90107C1",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 7.65,
 "hideDuration": 500,
 "yaw": 109.41,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_ACE1D66D_BF21_B062_41CE_710F156150BA",
 "image": {
  "levels": [
   {
    "url": "media/popup_ACE1D66D_BF21_B062_41CE_710F156150BA_0_3.jpg",
    "width": 1024,
    "height": 706,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -7.51,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98_camera",
 "initialPosition": {
  "hfov": 99,
  "yaw": 106.32,
  "pitch": -1.28,
  "class": "PanoramaCameraPosition"
 }
},
{
 "id": "ImageResource_AAD4CD2C_BF35_EB13_41A5_5014B866640E",
 "levels": [
  {
   "url": "media/popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875_0_0.jpg",
   "width": 1413,
   "height": 1092,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875_0_1.jpg",
   "width": 1024,
   "height": 791,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875_0_2.jpg",
   "width": 512,
   "height": 395,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "items": [
  {
   "media": "this.video_AB72F879_BE95_7D22_41D9_61CE633D38DD",
   "start": "this.viewer_uidE5FDF52F_F6B7_CDBF_41E2_F0001904935BVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_E5DD0544_F6B7_CDE1_41DB_8B569139AF8A, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_E5DD0544_F6B7_CDE1_41DB_8B569139AF8A, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidE5FDF52F_F6B7_CDBF_41E2_F0001904935BVideoPlayer)",
   "player": "this.viewer_uidE5FDF52F_F6B7_CDBF_41E2_F0001904935BVideoPlayer"
  }
 ],
 "id": "PlayList_E5DD0544_F6B7_CDE1_41DB_8B569139AF8A",
 "class": "PlayList"
},
{
 "duration": 100,
 "id": "effect_66561DD8_7178_4FDA_41B5_A74B9759BE30",
 "easing": "linear",
 "to": "bottom",
 "class": "SlideOutEffect"
},
{
 "id": "ImageResource_999FE25B_BF52_1936_41DC_F9120685B889",
 "levels": [
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_0.jpg",
   "width": 8651,
   "height": 6487,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_1.jpg",
   "width": 8192,
   "height": 6142,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_2.jpg",
   "width": 4096,
   "height": 3071,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_3.jpg",
   "width": 2048,
   "height": 1535,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_4.jpg",
   "width": 1024,
   "height": 767,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_5.jpg",
   "width": 512,
   "height": 383,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window25034"
 },
 "bodyPaddingRight": 0,
 "id": "window_A91DC6B4_BE96_FF45_41E2_2C723BE0957D",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5F96533_F6B7_CDA7_41E1_E627C6795A29"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "plaza bolivar",
 "id": "panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E",
 "thumbnailUrl": "media/panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "items": [
  {
   "media": "this.video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC",
   "start": "this.viewer_uidE5F3752E_F6B7_CDA1_41D8_C751C98EF555VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.PlayList_E5DC4544_F6B7_CDE1_4192_BB31A24F4F11, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.PlayList_E5DC4544_F6B7_CDE1_4192_BB31A24F4F11, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidE5F3752E_F6B7_CDA1_41D8_C751C98EF555VideoPlayer)",
   "player": "this.viewer_uidE5F3752E_F6B7_CDA1_41D8_C751C98EF555VideoPlayer"
  }
 ],
 "id": "PlayList_E5DC4544_F6B7_CDE1_4192_BB31A24F4F11",
 "class": "PlayList"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 15.46,
 "hideDuration": 500,
 "yaw": 156,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_CA122D68_C55B_5B76_41BC_163ECE009C39",
 "image": {
  "levels": [
   {
    "url": "media/popup_CA122D68_C55B_5B76_41BC_163ECE009C39_0_4.jpg",
    "width": 1024,
    "height": 768,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -2.82,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "id": "ImageResource_AAD62D2B_BF35_EB15_41DE_5A00B957C0DA",
 "levels": [
  {
   "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_0.jpg",
   "width": 2879,
   "height": 1679,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_1.jpg",
   "width": 2048,
   "height": 1194,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_2.jpg",
   "width": 1024,
   "height": 597,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_3.jpg",
   "width": 512,
   "height": 298,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "id": "ImageResource_CA352DA7_C549_BBFA_41D5_C91348F4C13C",
 "levels": [
  {
   "url": "media/popup_CA352DA7_C549_BBFA_41E6_161386B7E332_0_0.jpg",
   "width": 1772,
   "height": 709,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_CA352DA7_C549_BBFA_41E6_161386B7E332_0_1.jpg",
   "width": 1023,
   "height": 409,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_CA352DA7_C549_BBFA_41E6_161386B7E332_0_2.jpg",
   "width": 511,
   "height": 204,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "id": "ImageResource_9BD48771_BF72_27F5_41E7_DAF1962D5253",
 "levels": [
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_0.jpg",
   "width": 8651,
   "height": 6487,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_1.jpg",
   "width": 8192,
   "height": 6142,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_2.jpg",
   "width": 4096,
   "height": 3071,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_3.jpg",
   "width": 2048,
   "height": 1535,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_4.jpg",
   "width": 1024,
   "height": 767,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71_0_5.jpg",
   "width": 512,
   "height": 383,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E28EA5EC_F6B7_CCA1_41EC_A4798769E645",
 "initialPosition": {
  "hfov": 105,
  "yaw": 87.87,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A.ogg"
 },
 "class": "MediaAudio",
 "id": "audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A",
 "data": {
  "label": "ElevenLabs_2024-09-08T03_26_22_Charlie_pre_s100_sb75_se0_b_m2"
 }
},
{
 "items": [
  {
   "media": "this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E",
   "player": "this.viewer_uidE5FB7534_F6B7_CDA1_41C4_0A65E1AA55A3PanoPlayer",
   "camera": "this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5FB1534_F6B7_CDA1_41CA_588B5397C83D",
 "class": "PlayList"
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window27600"
 },
 "bodyPaddingRight": 0,
 "id": "window_A4DBFBBC_BEB2_9545_41D6_C8D63A5057DF",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5FB7534_F6B7_CDA1_41C4_0A65E1AA55A3"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 7.87,
 "hideDuration": 500,
 "yaw": 109.18,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A62E6F27_BF33_E71E_414D_7F4159A130D3",
 "image": {
  "levels": [
   {
    "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_5.jpg",
    "width": 1024,
    "height": 714,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 9.58,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "Street View 36D0",
 "id": "panorama_AA2A4656_BEB6_956F_415A_37CC95040116",
 "thumbnailUrl": "media/panorama_AA2A4656_BEB6_956F_415A_37CC95040116_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.11,
 "hideDuration": 500,
 "yaw": 62.11,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC",
 "image": {
  "levels": [
   {
    "url": "media/popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC_0_5.jpg",
    "width": 750,
    "height": 1024,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -6.94,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "items": [
  {
   "media": "this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC",
   "player": "this.viewer_uidE5FB9534_F6B7_CDA1_41D0_B0BBFA14EB43PanoPlayer",
   "camera": "this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5FA4534_F6B7_CDA1_41ED_362E88EFD229",
 "class": "PlayList"
},
{
 "id": "ImageResource_9861A25C_BF52_1932_41E3_B0581D3C0D64",
 "levels": [
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_0.jpg",
   "width": 8651,
   "height": 6487,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_1.jpg",
   "width": 8192,
   "height": 6142,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_2.jpg",
   "width": 4096,
   "height": 3071,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_3.jpg",
   "width": 2048,
   "height": 1535,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_4.jpg",
   "width": 1024,
   "height": 767,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2_0_5.jpg",
   "width": 512,
   "height": 383,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "id": "ImageResource_AAD1BD2A_BF35_EB16_41E0_62D0B58DD2A8",
 "levels": [
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_0.jpg",
   "width": 5000,
   "height": 6804,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_1.jpg",
   "width": 3009,
   "height": 4096,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_2.jpg",
   "width": 1504,
   "height": 2048,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_3.jpg",
   "width": 752,
   "height": 1024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_4.jpg",
   "width": 376,
   "height": 512,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_camera",
 "initialPosition": {
  "hfov": 125,
  "yaw": 83.98,
  "pitch": 12.22,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E2B915C3_F6B7_CCE7_41EB_6F3384995381",
 "initialPosition": {
  "hfov": 106,
  "yaw": 75.67,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E_camera",
 "initialPosition": {
  "hfov": 80,
  "yaw": -28.03,
  "pitch": 2.63,
  "class": "PanoramaCameraPosition"
 }
},
{
 "items": [
  {
   "media": "this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9",
   "player": "this.viewer_uidE5FE5530_F6B7_CDA1_41E2_545226200AA4PanoPlayer",
   "camera": "this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5FE0530_F6B7_CDA1_41E1_FB401C56161E",
 "class": "PlayList"
},
{
 "id": "ImageResource_AAD06D2A_BF35_EB17_41E2_E456BD624EBA",
 "levels": [
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_0.jpg",
   "width": 3333,
   "height": 5123,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_1.jpg",
   "width": 2664,
   "height": 4096,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_2.jpg",
   "width": 1332,
   "height": 2048,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_3.jpg",
   "width": 666,
   "height": 1024,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465_0_4.jpg",
   "width": 333,
   "height": 512,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "label": "video_7A9C6568_6E03_BD4C_41BB_CB49EF442FC8",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_9108967E_BF32_19EE_41E4_201CC3FF17B4_t.jpg",
 "width": 1280,
 "loop": false,
 "id": "video_9108967E_BF32_19EE_41E4_201CC3FF17B4",
 "class": "Video",
 "height": 720,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9108967E_BF32_19EE_41E4_201CC3FF17B4.mp4"
 }
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 22.47,
 "hideDuration": 500,
 "yaw": 175.17,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_CA43744F_C559_694A_41E3_6A94DB282096",
 "image": {
  "levels": [
   {
    "url": "media/popup_CA43744F_C559_694A_41E3_6A94DB282096_0_1.jpg",
    "width": 759,
    "height": 1024,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 0.56,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 5.33,
 "hideDuration": 500,
 "yaw": 115.82,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A904160D_BF21_53BD_41CD_A66E25EE7D42",
 "image": {
  "levels": [
   {
    "url": "media/popup_A904160D_BF21_53BD_41CD_A66E25EE7D42_0_4.jpg",
    "width": 747,
    "height": 1024,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -7.3,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "id": "ImageResource_AADB1D2E_BF35_EB6F_41E1_B0BB04B8F064",
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "camera_E57B4591_F6B7_CD63_41D2_19FAB042EF48",
 "initialPosition": {
  "hfov": 103,
  "yaw": -162.93,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 }
},
{
 "id": "ImageResource_9BD1576F_BF72_27ED_41E6_C94D013294AF",
 "levels": [
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_0.jpg",
   "width": 16833,
   "height": 11744,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_1.jpg",
   "width": 16384,
   "height": 11430,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_2.jpg",
   "width": 8192,
   "height": 5715,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_3.jpg",
   "width": 4096,
   "height": 2857,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_4.jpg",
   "width": 2048,
   "height": 1428,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_5.jpg",
   "width": 1024,
   "height": 714,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_A62E6F27_BF33_E71E_414D_7F4159A130D3_0_6.jpg",
   "width": 512,
   "height": 357,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_camera",
 "initialPosition": {
  "hfov": 84,
  "yaw": 154.72,
  "pitch": -2.67,
  "class": "PanoramaCameraPosition"
 }
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window28504"
 },
 "bodyPaddingRight": 0,
 "id": "window_A4DA311A_BEB3_F54D_41E0_10D105FB3BE2",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5E41535_F6B7_CDA3_41D6_C151FA10190A"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669_camera",
 "initialPosition": {
  "hfov": 80,
  "yaw": 3.37,
  "pitch": 7.75,
  "class": "PanoramaCameraPosition"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_camera",
 "initialPosition": {
  "hfov": 91,
  "yaw": 88.45,
  "pitch": 1.13,
  "class": "PanoramaCameraPosition"
 }
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window26716"
 },
 "bodyPaddingRight": 0,
 "id": "window_A2042F7F_BEB2_EDC2_41B1_5BDC3E51217C",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5FB9534_F6B7_CDA1_41D0_B0BBFA14EB43"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 7.55,
 "hideDuration": 500,
 "yaw": 101.54,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875",
 "image": {
  "levels": [
   {
    "url": "media/popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875_0_1.jpg",
    "width": 1024,
    "height": 791,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -8.7,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.93,
 "hideDuration": 500,
 "yaw": 69.72,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A",
 "image": {
  "levels": [
   {
    "url": "media/popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A_0_3.jpg",
    "width": 752,
    "height": 1024,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -7.42,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "items": [
  {
   "media": "this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4",
   "player": "this.viewer_uidE5FC052F_F6B7_CDBF_41DE_BCD086C7CFD9PanoPlayer",
   "camera": "this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5FCD52F_F6B7_CDBF_41DD_96F56BF9070A",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418",
   "player": "this.viewer_uidE5E52535_F6B7_CDA3_41E7_35D9B3D40536PanoPlayer",
   "camera": "this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5E58535_F6B7_CDA3_41C0_721F615F07FC",
 "class": "PlayList"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_A61333B3_BF52_3F75_41C0_083E46F7B44F.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_A61333B3_BF52_3F75_41C0_083E46F7B44F.ogg"
 },
 "class": "MediaAudio",
 "id": "audio_A61333B3_BF52_3F75_41C0_083E46F7B44F",
 "data": {
  "label": "ElevenLabs_2024-09-04T23_08_25_Charlie_pre_s100_sb75_se0_b_m2"
 }
},
{
 "rotationY": 0,
 "yaw": 93.03,
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 3.07,
 "autoplay": true,
 "id": "popup_CAEFACD1_C547_D957_41D6_AE6C75408208",
 "rotationX": 0,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "loop": false,
 "popupMaxHeight": "95%",
 "pitch": -29.27,
 "class": "PopupPanoramaOverlay",
 "popupMaxWidth": "95%",
 "hideDuration": 500,
 "popupDistance": 100,
 "video": {
  "width": 2986,
  "class": "VideoResource",
  "height": 1680,
  "mp4Url": "media/video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC.mp4"
 }
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_DED95086_CFDA_B5B9_41E1_B6DCE9E8C4EA.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_DED95086_CFDA_B5B9_41E1_B6DCE9E8C4EA.ogg"
 },
 "class": "MediaAudio",
 "id": "audio_DED95086_CFDA_B5B9_41E1_B6DCE9E8C4EA",
 "data": {
  "label": "relaxing-music-vol1-124477 (mp3cut.net)"
 }
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 39.1,
 "hideDuration": 500,
 "yaw": 90.15,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C",
 "image": {
  "levels": [
   {
    "url": "media/popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C_0_4.jpg",
    "width": 1024,
    "height": 767,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 0.58,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/f/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/u/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/r/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/b/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/d/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/0/{row}_{column}.jpg",
      "rowCount": 11,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 5632,
      "colCount": 11,
      "height": 5632
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/1/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/2/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/3/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_0/l/4/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "bellas artes",
 "id": "panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418",
 "thumbnailUrl": "media/panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "Street View 360",
 "id": "panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4",
 "thumbnailUrl": "media/panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "id": "ImageResource_AAD75D2B_BF35_EB15_4196_1BE8E0A63146",
 "levels": [
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_0.jpg",
   "width": 4372,
   "height": 2778,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_1.jpg",
   "width": 4096,
   "height": 2602,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_2.jpg",
   "width": 2048,
   "height": 1301,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_3.jpg",
   "width": 1024,
   "height": 650,
   "class": "ImageResourceLevel"
  },
  {
   "url": "media/popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2_0_4.jpg",
   "width": 512,
   "height": 325,
   "class": "ImageResourceLevel"
  }
 ],
 "class": "ImageResource"
},
{
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonPressedIconColor": "#888888",
 "closeButtonRollOverBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "Window413"
 },
 "bodyPaddingRight": 0,
 "id": "window_FD9C3012_F6B1_4361_41E9_658D85821AEB",
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "bodyBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "closeButtonPaddingTop": 5,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "scrollBarOpacity": 0.5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "minWidth": 20,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "closeButtonBorderColor": "#000000",
 "headerBackgroundColorDirection": "vertical",
 "backgroundColor": [],
 "bodyPaddingBottom": 0,
 "closeButtonBackgroundColorDirection": "vertical",
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowVerticalLength": 0,
 "closeButtonRollOverIconLineWidth": 5,
 "backgroundOpacity": 1,
 "closeButtonPressedIconLineWidth": 5,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "propagateClick": false,
 "closeButtonRollOverBorderSize": 0,
 "headerPaddingRight": 0,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5FDF52F_F6B7_CDBF_41E2_F0001904935B"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundOpacity": 0.3,
 "closeButtonIconColor": "#000000",
 "shadowHorizontalLength": 3,
 "closeButtonBackgroundOpacity": 0.3,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "closeButtonPaddingRight": 5,
 "scrollBarMargin": 2,
 "closeButtonPaddingLeft": 5,
 "closeButtonPaddingBottom": 5,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderSize": 0,
 "closeButtonBorderRadius": 0,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "layout": "vertical",
 "closeButtonPressedBorderColor": "#000000",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonRollOverBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "headerBackgroundOpacity": 0,
 "closeButtonBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 5,
 "paddingBottom": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#666666",
 "paddingTop": 0,
 "closeButtonRollOverBackgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "closeButtonPressedBorderSize": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4_camera",
 "initialPosition": {
  "hfov": 111,
  "yaw": -176.69,
  "pitch": 1.96,
  "class": "PanoramaCameraPosition"
 }
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window19306"
 },
 "bodyPaddingRight": 0,
 "id": "window_D5146985_C547_5BBE_41C2_0BDA6BC8F4D7",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5FC052F_F6B7_CDBF_41DE_BCD086C7CFD9"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "items": [
  {
   "media": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116",
   "player": "this.viewer_uidE5F96533_F6B7_CDA7_41E1_E627C6795A29PanoPlayer",
   "camera": "this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5F93533_F6B7_CDA7_41E3_93B1E225DC46",
 "class": "PlayList"
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window20926"
 },
 "bodyPaddingRight": 0,
 "id": "window_CAF50A20_C559_B8F6_41E6_344069E1C2AB",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5FEB530_F6B7_CDA1_41E0_4CA50E0EDB58"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_camera",
 "initialPosition": {
  "hfov": 92,
  "yaw": -2.42,
  "pitch": 9.24,
  "class": "PanoramaCameraPosition"
 }
},
{
 "hfovMax": 150,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/f/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/u/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/r/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/b/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/d/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/l/0/{row}_{column}.jpg",
      "rowCount": 4,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_t.jpg"
  }
 ],
 "vfov": 180,
 "label": "teatro",
 "id": "panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92",
 "thumbnailUrl": "media/panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92_t.jpg",
 "partial": false,
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_camera",
 "initialPosition": {
  "hfov": 106,
  "yaw": 105,
  "pitch": -6.82,
  "class": "PanoramaCameraPosition"
 }
},
{
 "adjacentPanoramas": [
  {
   "yaw": 173.16,
   "backwardYaw": 17.07,
   "distance": 1,
   "panorama": "this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD",
   "class": "AdjacentPanorama"
  },
  {
   "yaw": -7.66,
   "backwardYaw": 39.89,
   "distance": 1,
   "panorama": "this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525",
   "class": "AdjacentPanorama"
  }
 ],
 "label": "4",
 "id": "panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE",
 "thumbnailUrl": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_t.jpg",
 "pitch": 0,
 "class": "Panorama",
 "hfovMin": "400%",
 "hfov": 360,
 "hfovMax": 150,
 "partial": false,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "colCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A7F22179_BF2E_FBF2_41C6_2C6A56310698",
  "this.popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71",
  "this.overlay_A79E3A18_BF2E_6933_4183_23B529B6E83F",
  "this.overlay_A5A2F4DA_BF6E_1937_41E6_2592D8C0C379",
  "this.overlay_A4D4225B_BF6E_1936_41E1_32CC3C337BB3"
 ]
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_camera",
 "initialPosition": {
  "hfov": 105,
  "yaw": 58.46,
  "pitch": -1.19,
  "class": "PanoramaCameraPosition"
 }
},
{
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 9.03,
 "hideDuration": 500,
 "yaw": 93.3,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D",
 "image": {
  "levels": [
   {
    "url": "media/popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D_0_2.jpg",
    "width": 1024,
    "height": 597,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": -9.26,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "rotationY": 0,
 "rotationX": 0,
 "popupMaxWidth": "95%",
 "showDuration": 500,
 "showEasing": "cubic_in",
 "hfov": 17.33,
 "hideDuration": 500,
 "yaw": 171.08,
 "rotationZ": 0,
 "hideEasing": "cubic_out",
 "id": "popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF",
 "image": {
  "levels": [
   {
    "url": "media/popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF_0_4.jpg",
    "width": 1024,
    "height": 767,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 0.57,
 "class": "PopupPanoramaOverlay",
 "popupMaxHeight": "95%",
 "popupDistance": 100
},
{
 "items": [
  {
   "media": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C",
   "player": "this.viewer_uidE5E69535_F6B7_CDA3_41DD_289BA50156CAPanoPlayer",
   "camera": "this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_camera",
   "class": "PanoramaPlayListItem"
  }
 ],
 "id": "playList_E5E54535_F6B7_CDA3_41E2_3532C69074D9",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "id": "panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C_camera",
 "initialPosition": {
  "hfov": 99,
  "yaw": -98.35,
  "pitch": 2.73,
  "class": "PanoramaCameraPosition"
 }
},
{
 "closeButtonPressedIconColor": "#FFFFFF",
 "backgroundColorRatios": [],
 "data": {
  "name": "Window31291"
 },
 "bodyPaddingRight": 0,
 "id": "window_A3F77F07_BEBD_AD43_41E0_2C31FD642E74",
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingLeft": 5,
 "scrollBarColor": "#000000",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "headerVerticalAlign": "middle",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "scrollBarVisible": "rollOver",
 "bodyBackgroundOpacity": 0,
 "width": 400,
 "bodyPaddingTop": 0,
 "minHeight": 20,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "titleFontColor": "#000000",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "modal": true,
 "height": 600,
 "veilColorRatios": [
  0,
  1
 ],
 "titleFontSize": "1.29vmin",
 "minWidth": 20,
 "veilColorDirection": "horizontal",
 "headerBackgroundColorDirection": "vertical",
 "title": "",
 "bodyPaddingBottom": 0,
 "titleFontWeight": "normal",
 "backgroundColor": [],
 "shadowSpread": 1,
 "closeButtonBackgroundColor": [],
 "shadowVerticalLength": 0,
 "backgroundOpacity": 1,
 "headerBorderSize": 0,
 "shadow": true,
 "titlePaddingTop": 5,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "closeButtonPressedIconLineWidth": 3,
 "footerBackgroundOpacity": 0,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "overflow": "scroll",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "headerPaddingRight": 0,
 "propagateClick": false,
 "footerBackgroundColorDirection": "vertical",
 "children": [
  "this.viewer_uidE5E65536_F6B7_CDA1_41D6_76E00DF0487D"
 ],
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "titlePaddingRight": 5,
 "closeButtonIconHeight": 20,
 "paddingRight": 0,
 "class": "Window",
 "titleFontStyle": "normal",
 "shadowColor": "#000000",
 "borderSize": 0,
 "titleFontFamily": "Arial",
 "headerPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "closeButtonIconColor": "#B2B2B2",
 "headerBorderColor": "#000000",
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "shadowHorizontalLength": 3,
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "headerPaddingLeft": 10,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "headerPaddingTop": 10,
 "closeButtonBorderRadius": 11,
 "shadowBlurRadius": 6,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "gap": 10,
 "titleTextDecoration": "none",
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonBackgroundColorRatios": [],
 "closeButtonRollOverBackgroundColor": [],
 "headerBackgroundOpacity": 0,
 "layout": "vertical",
 "shadowOpacity": 0.5,
 "bodyPaddingLeft": 0,
 "closeButtonIconLineWidth": 2,
 "paddingBottom": 0,
 "paddingTop": 0,
 "borderRadius": 5,
 "titlePaddingBottom": 5,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 20,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ]
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541",
 "itemLabelFontStyle": "normal",
 "paddingLeft": 0,
 "scrollBarColor": "#FFFFFF",
 "itemThumbnailShadowVerticalLength": 3,
 "horizontalAlign": "center",
 "right": "44.39%",
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "itemPaddingRight": 3,
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "minHeight": 10,
 "verticalAlign": "top",
 "width": "11.218%",
 "itemThumbnailShadowOpacity": 0.27,
 "itemBorderRadius": 0,
 "minWidth": 10,
 "itemLabelFontFamily": "Arial",
 "itemThumbnailShadowHorizontalLength": 3,
 "itemPaddingLeft": 3,
 "itemMaxWidth": 1000,
 "selectedItemLabelFontColor": "#FFCC00",
 "itemLabelPosition": "top",
 "backgroundColor": [
  "#000000"
 ],
 "itemOpacity": 1,
 "itemHorizontalAlign": "center",
 "itemThumbnailShadowSpread": 1,
 "height": "17.924%",
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0.33,
 "shadow": false,
 "itemThumbnailBorderRadius": 19,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemWidth": 60,
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "rollOverItemBackgroundOpacity": 0,
 "rollOverItemLabelFontWeight": "bold",
 "paddingRight": 0,
 "class": "ThumbnailGrid",
 "itemMinHeight": 50,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "playList": "this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541_playlist",
 "itemThumbnailShadowBlurRadius": 8,
 "bottom": "5.58%",
 "itemLabelFontSize": 14,
 "itemMinWidth": 50,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "middle",
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailScaleMode": "fit_outside",
 "itemHeight": 80,
 "gap": 0,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 33,
 "paddingTop": 0,
 "itemThumbnailShadow": true,
 "paddingBottom": 0,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "data": {
  "name": "PANORAMAS"
 },
 "itemLabelGap": 1,
 "scrollBarWidth": 10,
 "itemThumbnailShadowColor": "#000000"
},
{
 "maxHeight": 1094,
 "propagateClick": false,
 "id": "Image_662ED9D9_7178_37D1_41BC_B29C3F34DB16",
 "paddingRight": 0,
 "right": "48.3%",
 "class": "Image",
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_662ED9D9_7178_37D1_41BC_B29C3F34DB16.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "2.86%",
 "bottom": "0.51%",
 "minWidth": 1,
 "click": "if(!this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541.get('visible')){ this.setComponentVisibility(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541, true, 0, this.effect_66563DD8_7178_4FDA_41D7_8C4F9A40867B, 'showEffect', false) } else { this.setComponentVisibility(this.ThumbnailList_62659F6F_7138_4CF6_41D2_CE725DEFA541, false, 0, this.effect_66561DD8_7178_4FDA_41B5_A74B9759BE30, 'hideEffect', false) }",
 "height": "4.204%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image24731"
 },
 "maxWidth": 1096
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_6792CE20_7179_CC6A_41D0_E818C4D261B5",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0.06%",
 "class": "Container",
 "paddingLeft": 0,
 "children": [
  "this.Container_679D9E20_7179_CC6A_41D2_5F5D75BA8E2D",
  "this.Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 104.1,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "4.16%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": 416.29,
 "gap": 10,
 "layout": "absolute",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "scroll",
 "data": {
  "name": "--SETTINGS"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "Container_C6C04894_C81E_A06E_41E2_CFA3F601EC35",
 "left": "1.45%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "class": "Container",
 "paddingLeft": 0,
 "children": [
  "this.Image_C6C7AAB5_C81F_A1AF_41C0_5D9062D984B6"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": "11.036%",
 "width": "6.09%",
 "gap": 10,
 "layout": "absolute",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container2784"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "veilPopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "class": "UIComponent",
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "bottom": 0,
 "minWidth": 0,
 "backgroundColor": [
  "#000000"
 ],
 "top": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.55,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "UIComponent3334"
 }
},
{
 "backgroundColorRatios": [],
 "id": "zoomImagePopupPanorama",
 "left": 0,
 "propagateClick": false,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 0,
 "class": "ZoomImage",
 "borderSize": 0,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "bottom": 0,
 "minWidth": 0,
 "backgroundColor": [],
 "top": 0,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "scaleMode": "custom",
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "ZoomImage3335"
 }
},
{
 "textDecoration": "none",
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "data": {
  "name": "CloseButton3336"
 },
 "id": "closeButtonPopupPanorama",
 "rollOverIconColor": "#666666",
 "propagateClick": false,
 "paddingLeft": 5,
 "paddingRight": 5,
 "fontFamily": "Arial",
 "right": 10,
 "class": "CloseButton",
 "shadowColor": "#000000",
 "borderSize": 0,
 "fontColor": "#FFFFFF",
 "iconHeight": 20,
 "minHeight": 0,
 "backgroundColorDirection": "vertical",
 "borderColor": "#000000",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "showEffect": {
  "duration": 350,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "iconColor": "#000000",
 "minWidth": 0,
 "iconLineWidth": 5,
 "mode": "push",
 "fontSize": "1.29vmin",
 "label": "",
 "backgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "shadowBlurRadius": 6,
 "top": 10,
 "gap": 5,
 "layout": "horizontal",
 "fontStyle": "normal",
 "pressedIconColor": "#888888",
 "paddingTop": 5,
 "shadow": false,
 "paddingBottom": 5,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "visible": false,
 "iconBeforeLabel": true,
 "iconWidth": 20,
 "cursor": "hand",
 "fontWeight": "normal"
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_679D1E20_7179_CC6A_41CF_662941DB817D",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_679D1E20_7179_CC6A_41CF_662941DB817D.png",
 "pressedRollOverIconURL": "skin/IconButton_679D1E20_7179_CC6A_41CF_662941DB817D_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_679D1E20_7179_CC6A_41CF_662941DB817D_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0.png",
 "pressedRollOverIconURL": "skin/IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "viewerArea": "this.viewer_uidE5FEB530_F6B7_CDA1_41E0_4CA50E0EDB58",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5FEB530_F6B7_CDA1_41E0_4CA50E0EDB58PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5FE5530_F6B7_CDA1_41E2_545226200AA4",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3324"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE, this.camera_E29F65DF_F6B7_CC9F_41A5_BE6BD8AB58B9); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.63,
   "image": "this.AnimatedImageResource_9CD42421_BF75_F915_41C2_7AF2DC73F85A",
   "pitch": -19.52,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 17.07,
   "distance": 100
  }
 ],
 "id": "overlay_A0EF30B3_BF72_1976_41BC_B16DDEE112D3",
 "maps": [
  {
   "hfov": 12.63,
   "yaw": 17.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_0_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.52,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC, this.camera_E28EA5EC_F6B7_CCA1_41EC_A4798769E645); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.7,
   "image": "this.AnimatedImageResource_9CDBA421_BF75_F915_41DE_47772E66CEF1",
   "pitch": -18.71,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -98.16,
   "distance": 100
  }
 ],
 "id": "overlay_A1D596B1_BF75_F975_41E5_161D6B995BAA",
 "maps": [
  {
   "hfov": 12.7,
   "yaw": -98.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_1_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_A0BFE7E3_BF6D_E716_41E6_C99DB927DB5C, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_999FE25B_BF52_1936_41DC_F9120685B889, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 39.64,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_2_0.png",
      "width": 939,
      "height": 716,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.58,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 90.15
  }
 ],
 "id": "overlay_9ADC8EA8_BF72_2913_41E0_6B8608E63068",
 "maps": [
  {
   "hfov": 39.64,
   "yaw": 90.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_2_1_0_map.gif",
      "width": 200,
      "height": 152,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_9A5AEADA_BF6E_2937_41E6_9A2C5F3FA1CF, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9860F25C_BF52_1932_41C2_F37C30930EC7, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.29,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_3_0.png",
      "width": 419,
      "height": 699,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.57,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 171.08
  }
 ],
 "id": "overlay_9DE28A0A_BF6E_2916_41CD_9171EAA1F0AF",
 "maps": [
  {
   "hfov": 18.29,
   "yaw": 171.08,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_3_1_0_map.gif",
      "width": 119,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_9E99E5FF_BF6E_3AED_4172_77C561E294B2, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9861A25C_BF52_1932_41E3_B0581D3C0D64, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 21.48,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_4_0.png",
      "width": 494,
      "height": 707,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.69,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": -169.57
  }
 ],
 "id": "overlay_9C2C01F1_BF6E_3AF2_41C8_C58DC783679D",
 "maps": [
  {
   "hfov": 21.48,
   "yaw": -169.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_4_1_0_map.gif",
      "width": 139,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "if(this.getGlobalAudio(this.audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C).get('state') == 'playing') { this.pauseGlobalAudio(this.audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C); } else { var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_8F3B45BE_BFF3_FB6F_41AF_A0E481C8AC4C); var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else { this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.36,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_5_0.png",
      "width": 54,
      "height": 55,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.95,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 107
  }
 ],
 "id": "overlay_90C45A72_BFF2_69F6_41C5_5E2F51F26185",
 "maps": [
  {
   "hfov": 2.36,
   "yaw": 107,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5E30538_F6B7_CDA1_41E3_54A210BFE6BE",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3333"
 }
},
{
 "viewerArea": "this.viewer_uidE5F3A52D_F6B7_CDA3_41DB_A9B39342938F",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5F3A52D_F6B7_CDA3_41DB_A9B39342938FPanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583, this.camera_E2B915C3_F6B7_CCE7_41EB_6F3384995381); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.55,
   "image": "this.AnimatedImageResource_AEAFE12C_BE75_8F23_41DE_C19E21A79B25",
   "pitch": -20.61,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 125.22,
   "distance": 100
  }
 ],
 "id": "overlay_B0D42CA9_BE75_9525_41DF_01C3AA07CDEE",
 "maps": [
  {
   "hfov": 12.55,
   "yaw": 125.22,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_1_HS_0_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE, this.camera_E54925B6_F6B7_CCA1_41DA_C53548869275); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.7,
   "image": "this.AnimatedImageResource_AEAF712D_BE75_8F3D_41E1_F7DB60B1522D",
   "pitch": -18.61,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 39.89,
   "distance": 100
  }
 ],
 "id": "overlay_B1FED0EE_BE76_8D3F_41A8_6CA6EB70BB0E",
 "maps": [
  {
   "hfov": 12.7,
   "yaw": 39.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_1_HS_1_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 14.72,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0_HS_2_0.png",
      "width": 336,
      "height": 50,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.99,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 128.77
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": false,
 "rollOverDisplay": false,
 "id": "overlay_D1E3752E_C548_A8CA_41D7_562CC9728E8B",
 "data": {
  "label": "Poligon"
 },
 "maps": [
  {
   "hfov": 14.72,
   "yaw": 128.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_0_HS_2_1_0_map.gif",
      "width": 168,
      "height": 25,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.99,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD, this.camera_E55A95AA_F6B7_CCA1_4199_6A11AC1021CE); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.45,
   "image": "this.AnimatedImageResource_9CDB6421_BF75_F915_415C_65EFB5DE58CC",
   "pitch": -21.5,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -92.13,
   "distance": 100
  }
 ],
 "id": "overlay_A18AC4B2_BF76_1976_41C1_3449A2C14288",
 "maps": [
  {
   "hfov": 16.45,
   "yaw": -92.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_0_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_98B78152_BF32_1B36_41C1_12FC4C3B47D5, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_93E5035B_BF3E_1F36_41E4_02AC12C6A6B2, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 40.4,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_1_0.png",
      "width": 959,
      "height": 749,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.46,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 88.04
  }
 ],
 "id": "overlay_99A56090_BF32_3932_4181_B8C673A66BE9",
 "maps": [
  {
   "hfov": 40.4,
   "yaw": 88.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_1_1_0_map.gif",
      "width": 200,
      "height": 156,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.46,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "blending": 0,
 "video": {
  "width": 1280,
  "class": "VideoResource",
  "height": 720,
  "mp4Url": "media/video_9108967E_BF32_19EE_41E4_201CC3FF17B4.mp4"
 },
 "enabledInCardboard": true,
 "autoplay": true,
 "id": "overlay_91E59851_BF2D_E932_4185_722D58DF4B27",
 "hfov": 50.18,
 "loop": true,
 "image": {
  "levels": [
   {
    "url": "media/overlay_91E59851_BF2D_E932_4185_722D58DF4B27_t.jpg",
    "width": 1280,
    "height": 720,
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "pitch": 0.76,
 "class": "VideoPanoramaOverlay",
 "useHandCursor": true,
 "roll": 0.19,
 "yaw": 2.88,
 "rotationY": -1,
 "rotationX": -0.62,
 "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_936400A0_BF3E_7912_41D9_2DED96CB6E81, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_FCDC1E4D_F6B1_5FE2_41E5_C33C370A6A66, this.video_92B5B1ED_BF32_1B12_41AC_845335AD02C7, this.PlayList_E5D8C545_F6B7_CDE3_41E2_B925A464E6C9, '95%', '95%', true, true) }",
 "videoVisibleOnStop": false,
 "data": {
  "label": "Video"
 },
 "vfov": 38.57,
 "distance": 50
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "if(this.getGlobalAudio(this.audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A).get('state') == 'playing') { this.pauseGlobalAudio(this.audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A); } else { var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_C0D8AC3E_CFAD_428E_41D9_34363FF2515A); }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.11,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_2_0.png",
      "width": 72,
      "height": 61,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.93,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 104.77
  }
 ],
 "id": "overlay_DDC6386A_CD05_0C99_41DF_B08A4474BEE0",
 "maps": [
  {
   "hfov": 3.11,
   "yaw": 104.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_2_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "viewerArea": "this.viewer_uidE5E30538_F6B7_CDA1_41E3_54A210BFE6BE",
 "id": "viewer_uidE5E30538_F6B7_CDA1_41E3_54A210BFE6BEVideoPlayer",
 "displayPlaybackBar": true,
 "class": "VideoPlayer"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5F3752E_F6B7_CDA1_41D8_C751C98EF555",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3320"
 }
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5E52535_F6B7_CDA3_41E7_35D9B3D40536",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3330"
 }
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5FAC534_F6B7_CDA1_41E7_5F9467DE0695",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3326"
 }
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5E69535_F6B7_CDA3_41DD_289BA50156CA",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3331"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_AB5C7DC8_BEF5_9763_41DB_D75FE7488377, {'iconLineWidth':5,'rollOverIconHeight':30,'pressedIconHeight':30,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':30,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':30,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':30,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':30,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_A9CC5FAA_BEF2_9327_41B7_FE8E120DE5C2, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 67.67,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_0_0.png",
      "width": 1748,
      "height": 1286,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.54,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 89.52
  }
 ],
 "id": "overlay_ABB4B996_BEF5_9FEF_41C0_2F1A7275D166",
 "maps": [
  {
   "hfov": 67.67,
   "yaw": 89.52,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 147,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.54,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_AA1C4880_BEE6_B0A3_41CC_33077AC176BC, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_A94824E1_BEE1_B065_41CC_505D04DA2E35, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.58,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_1_0.png",
      "width": 127,
      "height": 170,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.94,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 62.11
  }
 ],
 "id": "overlay_A319A6B7_BEF2_B52D_41D3_27F004D737D3",
 "maps": [
  {
   "hfov": 5.58,
   "yaw": 62.11,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_1_1_0_map.gif",
      "width": 63,
      "height": 85,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.94,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_A95280C9_BEDE_B0A2_41C3_0426205CD93A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_AAD1BD2A_BF35_EB16_41E0_62D0B58DD2A8, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.35,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_2_0.png",
      "width": 167,
      "height": 132,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.42,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 69.72
  }
 ],
 "id": "overlay_A5E2BE86_BEFE_B5EF_41D9_F30BDE3E73E5",
 "maps": [
  {
   "hfov": 7.35,
   "yaw": 69.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_2_1_0_map.gif",
      "width": 83,
      "height": 66,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.42,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_AA974DC7_BEDF_50AD_41E6_D775F37E0465, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_AAD06D2A_BF35_EB17_41E2_E456BD624EBA, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.28,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_3_0.png",
      "width": 142,
      "height": 190,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.66,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 76.93
  }
 ],
 "id": "overlay_A7785CB2_BEFE_F526_41D5_693CD3F417C0",
 "maps": [
  {
   "hfov": 6.28,
   "yaw": 76.93,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_3_1_0_map.gif",
      "width": 71,
      "height": 95,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.66,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_ABDAB1D8_BF21_B0A3_41E0_C52CA270C3B2, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_AAD75D2B_BF35_EB15_4196_1BE8E0A63146, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.77,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_4_0.png",
      "width": 199,
      "height": 173,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.04,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 84.88
  }
 ],
 "id": "overlay_A40D28B6_BEFD_7D2F_41E0_3EF222D5DF50",
 "maps": [
  {
   "hfov": 8.77,
   "yaw": 84.88,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_4_1_0_map.gif",
      "width": 99,
      "height": 86,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_ABB1A1C4_BF27_70A3_41BA_9F6CB90E606D, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_AAD62D2B_BF35_EB15_41DE_5A00B957C0DA, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_5_0.png",
      "width": 215,
      "height": 154,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.26,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 93.3
  }
 ],
 "id": "overlay_A674DDA4_BEFD_B723_41E6_6E125AE567D8",
 "maps": [
  {
   "hfov": 9.43,
   "yaw": 93.3,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_5_1_0_map.gif",
      "width": 107,
      "height": 77,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_ACB93F49_BF22_B1A5_41D6_6DBD22F5D875, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_AAD4CD2C_BF35_EB13_41A5_5014B866640E, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.03,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_6_0.png",
      "width": 182,
      "height": 149,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.7,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 101.54
  }
 ],
 "id": "overlay_A7336DD3_BEF2_9765_41E6_9E7C98C69EA8",
 "maps": [
  {
   "hfov": 8.03,
   "yaw": 101.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_6_1_0_map.gif",
      "width": 91,
      "height": 74,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_ACE1D66D_BF21_B062_41CE_710F156150BA, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_AAD52D2C_BF35_EB13_41C8_6FB4CC88898E, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.11,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_7_0.png",
      "width": 184,
      "height": 138,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.51,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 109.41
  }
 ],
 "id": "overlay_A90D73E4_BEF3_7323_41E7_57CE3A611FE7",
 "maps": [
  {
   "hfov": 8.11,
   "yaw": 109.41,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_7_1_0_map.gif",
      "width": 92,
      "height": 69,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_A904160D_BF21_53BD_41CD_A66E25EE7D42, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_AAD43D2D_BF35_EB6D_41DF_4066860A658B, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.78,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_8_0.png",
      "width": 131,
      "height": 179,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.3,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 115.82
  }
 ],
 "id": "overlay_A614A866_BEF3_9D2F_41CC_7D20C75E9AC4",
 "maps": [
  {
   "hfov": 5.78,
   "yaw": 115.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_8_1_0_map.gif",
      "width": 65,
      "height": 89,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_A9B6863C_BF21_D3E3_41C7_68717E65CB9A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_AADB0D2E_BF35_EB6F_41E1_A71D8747E3ED, this.ImageResource_AADB1D2E_BF35_EB6F_41E1_B0BB04B8F064, this.ImageResource_E526B55F_F6B7_CD9F_41A8_83E96D32AC51, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.43,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_9_0.png",
      "width": 192,
      "height": 167,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.11,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 109.77
  }
 ],
 "id": "overlay_A74F4B8C_BEF2_B3E3_419C_8819A5EBF662",
 "maps": [
  {
   "hfov": 8.43,
   "yaw": 109.77,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_9_1_0_map.gif",
      "width": 96,
      "height": 83,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_A62E6F27_BF33_E71E_414D_7F4159A130D3, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9BD1576F_BF72_27ED_41E6_C94D013294AF, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.44,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_10_0.png",
      "width": 192,
      "height": 141,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.58,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 109.18
  }
 ],
 "id": "overlay_A6EBB5B7_BEF2_B72D_41E0_5F90A6264D7B",
 "maps": [
  {
   "hfov": 8.44,
   "yaw": 109.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_10_1_0_map.gif",
      "width": 96,
      "height": 70,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 9.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_A91DC6B4_BE96_FF45_41E2_2C723BE0957D, this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116, this.playList_E5F93533_F6B7_CDA7_41E3_93B1E225DC46, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.94,
   "image": "this.AnimatedImageResource_A4A2E691_BEB7_9F5F_41C1_1E58DC3CC458",
   "pitch": -17.15,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 61.69,
   "distance": 100
  }
 ],
 "id": "overlay_A6D7CA14_BEF6_BCE3_41C6_D9A8B8021E25",
 "maps": [
  {
   "hfov": 2.94,
   "yaw": 61.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_11_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.15,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_A7F7142D_BEB6_B346_41DE_160664B2D89C, this.panorama_A63C99C6_BEB5_B4C5_41E6_748FBD257669, this.playList_E5FAF533_F6B7_CDA7_41EB_9753F03C9B4E, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.93,
   "image": "this.AnimatedImageResource_A4A25692_BEB7_9F5D_41E6_A97AB3941196",
   "pitch": -17.99,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 68.87,
   "distance": 100
  }
 ],
 "id": "overlay_A79A7AF3_BEF6_9D25_41C4_10E641F9B442",
 "maps": [
  {
   "hfov": 2.93,
   "yaw": 68.87,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_12_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.99,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_A2042F7F_BEB2_EDC2_41B1_5BDC3E51217C, this.panorama_A7C16A41_BEB2_973E_41DC_57D1B351B8AC, this.playList_E5FA4534_F6B7_CDA1_41ED_362E88EFD229, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.92,
   "image": "this.AnimatedImageResource_A4A39692_BEB7_9F5D_41E0_286E1D0BD12B",
   "pitch": -18.57,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 75.99,
   "distance": 100
  }
 ],
 "id": "overlay_A9470ABB_BEF6_9D25_41E1_BFEC9F22709F",
 "maps": [
  {
   "hfov": 2.92,
   "yaw": 75.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_13_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.57,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_A4DBFBBC_BEB2_9545_41D6_C8D63A5057DF, this.panorama_A5C41955_BEB3_95C7_41C3_6DAD644E134E, this.playList_E5FB1534_F6B7_CDA1_41CA_588B5397C83D, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.91,
   "image": "this.AnimatedImageResource_A4A0D692_BEB7_9F5D_41DD_50EF85E5DB37",
   "pitch": -19.08,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 84.07,
   "distance": 100
  }
 ],
 "id": "overlay_A62A556F_BEF5_973E_41A8_3FA74B909572",
 "maps": [
  {
   "hfov": 2.91,
   "yaw": 84.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_14_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_A4DA311A_BEB3_F54D_41E0_10D105FB3BE2, this.panorama_A5B28F87_BEB3_AD42_4195_3611C7388D98, this.playList_E5E4F535_F6B7_CDA3_41E0_BBB3E90107C1, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.92,
   "image": "this.AnimatedImageResource_A4A1A693_BEB7_9F43_41E1_6BB29DD818C2",
   "pitch": -18.82,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 109.14,
   "distance": 100
  }
 ],
 "id": "overlay_A722CBAE_BEF5_F33F_41E2_7CD2EE811F9A",
 "maps": [
  {
   "hfov": 2.92,
   "yaw": 109.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_16_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_A474FCEC_BEB2_ACC6_41CB_181217D91186, this.panorama_A2D3E716_BEB2_9D45_41D2_BE79A4531418, this.playList_E5E58535_F6B7_CDA3_41C0_721F615F07FC, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.93,
   "image": "this.AnimatedImageResource_A4A6E693_BEB7_9F43_41CF_6FF343C909DB",
   "pitch": -17.73,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 116.45,
   "distance": 100
  }
 ],
 "id": "overlay_A9056E81_BEF5_95E5_41E0_A94A278C8589",
 "maps": [
  {
   "hfov": 2.93,
   "yaw": 116.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_17_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_A44997AA_BEB2_BD4D_41B0_33A1398521F4, this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C, this.playList_E5E54535_F6B7_CDA3_41E2_3532C69074D9, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.08,
   "image": "this.AnimatedImageResource_A4A63693_BEB7_9F43_41E4_8F77876F947E",
   "pitch": -1.51,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 120.75,
   "distance": 100
  }
 ],
 "id": "overlay_A6D0E2DE_BEF5_8D1F_41E0_F4CC9E3A1D41",
 "maps": [
  {
   "hfov": 3.08,
   "yaw": 120.75,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_18_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.51,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_A3F77F07_BEBD_AD43_41E0_2C31FD642E74, this.panorama_9E8EC20E_BEBD_B745_41A1_02227B86CE92, this.playList_E5E61536_F6B7_CDA1_41EE_657DBEAF6F02, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 1"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.03,
   "image": "this.AnimatedImageResource_A4A6F694_BEB7_9F45_417C_6C246082767C",
   "pitch": 10.16,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 120.69,
   "distance": 100
  }
 ],
 "id": "overlay_A6571966_BEF5_7F2F_41D2_CE07DB193AAA",
 "maps": [
  {
   "hfov": 3.03,
   "yaw": 120.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_19_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 10.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583, this.camera_E2AF75D0_F6B7_CCE1_41C7_FD2B665DF2B8); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.14,
   "image": "this.AnimatedImageResource_9CD55420_BF75_F913_41D3_7A48F90DF16B",
   "pitch": -11.35,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -89,
   "distance": 100
  }
 ],
 "id": "overlay_A0A7BB52_BF76_2F36_41D0_41B67BD7E48A",
 "maps": [
  {
   "hfov": 13.14,
   "yaw": -89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_20_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "viewerArea": "this.viewer_uidE5FAC534_F6B7_CDA1_41E7_5F9467DE0695",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5FAC534_F6B7_CDA1_41E7_5F9467DE0695PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_CA352DA7_C549_BBFA_41E6_161386B7E332, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_CA352DA7_C549_BBFA_41D5_C91348F4C13C, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.58,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_0_0.png",
      "width": 287,
      "height": 112,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.87,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 61.33
  }
 ],
 "id": "overlay_CAC67DCD_C549_BB4E_41C5_3CF13C58EEDB",
 "maps": [
  {
   "hfov": 12.58,
   "yaw": 61.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_0_1_0_map.gif",
      "width": 143,
      "height": 56,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_CA9B483E_C547_78CA_41D2_B4025CE0C701, this.panorama_AA2A4656_BEB6_956F_415A_37CC95040116, this.playList_E5F1752C_F6B7_CDA1_41DF_C9BA8DEFEC44, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "toolTip": "Torre del reloj",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 2"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.91,
   "image": "this.AnimatedImageResource_D461C14F_C559_6B4A_41D5_1C96710D9973",
   "pitch": -29.49,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 88.01,
   "distance": 100
  }
 ],
 "id": "overlay_CABE589A_C547_79CA_41E8_391573AB0C7A",
 "maps": [
  {
   "hfov": 1.91,
   "yaw": 88.01,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.49,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_CAEFACD1_C547_D957_41D6_AE6C75408208, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_FD9D7012_F6B1_4361_41EC_7DC37192CED3, this.video_AB81C803_BE92_9CE5_41E0_02B28EDD68CC, this.PlayList_E5DC4544_F6B7_CDE1_4192_BB31A24F4F11, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.07,
   "image": "this.AnimatedImageResource_D46EF14F_C559_6B4A_41D5_C326E5BD1BB5",
   "pitch": -29.27,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 93.03,
   "distance": 100
  }
 ],
 "id": "overlay_CAE19CF2_C547_D955_41D9_9112F9CEC59E",
 "maps": [
  {
   "hfov": 3.07,
   "yaw": 93.03,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_D5146985_C547_5BBE_41C2_0BDA6BC8F4D7, this.panorama_A9C42A21_BE9E_9D25_41D1_5BC75567C2B4, this.playList_E5FCD52F_F6B7_CDBF_41DD_96F56BF9070A, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "toolTip": "Camellon de los martirez",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 2"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.98,
   "image": "this.AnimatedImageResource_D46E414F_C559_6B4A_41D6_1A58FC730F5B",
   "pitch": -25.81,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 90.26,
   "distance": 100
  }
 ],
 "id": "overlay_D5C829C0_C547_5BB6_41E1_0C9B58377FB2",
 "maps": [
  {
   "hfov": 1.98,
   "yaw": 90.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.81,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "if(this.isCardboardViewMode()) { this.showPopupPanoramaVideoOverlay(this.popup_CAE3408C_C558_E9CE_41D2_099A88CECC9A, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, true) } else { this.showPopupMedia(this.window_FD9C3012_F6B1_4361_41E9_658D85821AEB, this.video_AB72F879_BE95_7D22_41D9_61CE633D38DD, this.PlayList_E5DD0544_F6B7_CDE1_41DB_8B569139AF8A, '95%', '95%', true, true) }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.24,
   "image": "this.AnimatedImageResource_D46F8150_C559_6B56_41E4_0F480C3C4F98",
   "pitch": -22.86,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 90.13,
   "distance": 100
  }
 ],
 "id": "overlay_CA9510AC_C558_E9CE_41C3_A41D5EF48930",
 "maps": [
  {
   "hfov": 3.24,
   "yaw": 90.13,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.86,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_CAF50A20_C559_B8F6_41E6_344069E1C2AB, this.panorama_B3AFB97C_BF2E_EBF3_41D0_AF8805DEB55C, this.playList_E5FD7530_F6B7_CDA1_41ED_ED27B71703F6, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "toolTip": "Parque centenario",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 2"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.98,
   "image": "this.AnimatedImageResource_D46CC150_C559_6B56_41C0_2B5D50FC0C54",
   "pitch": -25.82,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 85.76,
   "distance": 100
  }
 ],
 "id": "overlay_CA933A5B_C559_B94B_41DC_B587DA0D153D",
 "maps": [
  {
   "hfov": 1.98,
   "yaw": 85.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -25.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.openLink('https://heyzine.com/flip-book/34871c23aa.html', '_blank')",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Info Red 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.26,
   "image": "this.AnimatedImageResource_D46FB150_C559_6B56_41E0_6BA58B9F2770",
   "pitch": -21.83,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 85.09,
   "distance": 100
  }
 ],
 "id": "overlay_CA0B160C_C558_A8CE_41D1_FE8D55B30963",
 "maps": [
  {
   "hfov": 3.26,
   "yaw": 85.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_6_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.showPopupMedia(this.window_CAEAFA9A_C558_B9CA_41D9_0CD75738D73C, this.panorama_D22F09FB_C01B_24AE_41E4_5AF52AC919C9, this.playList_E5FE0530_F6B7_CDA1_41E1_FB401C56161E, '90%', '90%', false, false)",
   "mapColor": "#FF0000",
   "toolTip": "obelisco ",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle 360 2"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.05,
   "image": "this.AnimatedImageResource_D46F5151_C559_6B56_41E4_1414340655C1",
   "pitch": -21.01,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 80.18,
   "distance": 100
  }
 ],
 "id": "overlay_CA8B0AD6_C558_B95D_41E4_58F264E4C75B",
 "maps": [
  {
   "hfov": 2.05,
   "yaw": 80.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_7_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -21.01,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4, this.camera_E5068578_F6B7_CDA1_41C1_723DD080CD5E); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.3,
   "image": "this.AnimatedImageResource_D46C9151_C559_6B56_41E5_1AE858BE7819",
   "pitch": -7.1,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 88.48,
   "distance": 100
  }
 ],
 "id": "overlay_CA589D5A_C55B_BB4A_41E3_4F4E800E94EA",
 "maps": [
  {
   "hfov": 13.3,
   "yaw": 88.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_8_0_0_map.gif",
      "width": 26,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.1,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "if(this.getGlobalAudio(this.audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A).get('state') == 'playing') { this.pauseGlobalAudio(this.audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A); } else { var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_DFA85FC9_CFDE_AB48_41DE_10B274ADCD6A); }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.11,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_9_0.png",
      "width": 72,
      "height": 72,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.07,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -173.96
  }
 ],
 "id": "overlay_CAFD7E23_C55B_58FA_41D3_0CC50F82DA5A",
 "maps": [
  {
   "hfov": 3.11,
   "yaw": -173.96,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_9_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_CA43744F_C559_694A_41E3_6A94DB282096, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_CA43544F_C559_694A_41B9_3C1104FC2891, null, null, 10300, null, false)",
   "mapColor": "#FF0000",
   "toolTip": "Retrato luis felipe jaspe franco",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.4,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_10_0.png",
      "width": 563,
      "height": 716,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 175.17
  }
 ],
 "id": "overlay_CA7DF477_C559_695B_41DD_EC1D84E678D4",
 "maps": [
  {
   "hfov": 24.4,
   "yaw": 175.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_10_1_0_map.gif",
      "width": 156,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.56,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_CA122D68_C55B_5B76_41BC_163ECE009C39, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_CA1DDD68_C55B_5B76_41E1_7549F89DFD79, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.04,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_11_0.png",
      "width": 367,
      "height": 496,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.82,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 156
  }
 ],
 "id": "overlay_CA35DD8A_C55B_5BCA_41E7_0DCC2394A201",
 "maps": [
  {
   "hfov": 16.04,
   "yaw": 156,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_11_1_0_map.gif",
      "width": 147,
      "height": 200,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525, this.camera_E5755584_F6B7_CD61_41E4_9F53F70B53A7); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.75,
   "image": "this.AnimatedImageResource_DF95A6A2_C548_A9F5_41BC_5ADA030DEDB1",
   "pitch": -27.07,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -104.33,
   "distance": 100
  }
 ],
 "id": "overlay_D140E706_C579_68BA_41E3_CE7135259DF3",
 "maps": [
  {
   "hfov": 15.75,
   "yaw": -104.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_12_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.07,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5F3A52D_F6B7_CDA3_41DB_A9B39342938F",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3319"
 }
},
{
 "viewerArea": "this.viewer_uidE5E65536_F6B7_CDA1_41D6_76E00DF0487D",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5E65536_F6B7_CDA1_41D6_76E00DF0487DPanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "viewerArea": "this.viewer_uidE5E41535_F6B7_CDA3_41D6_C151FA10190A",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5E41535_F6B7_CDA3_41D6_C151FA10190APanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "viewerArea": "this.viewer_uidE5FDF52F_F6B7_CDBF_41E2_F0001904935B",
 "id": "viewer_uidE5FDF52F_F6B7_CDBF_41E2_F0001904935BVideoPlayer",
 "displayPlaybackBar": true,
 "class": "VideoPlayer"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5F96533_F6B7_CDA7_41E1_E627C6795A29",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3325"
 }
},
{
 "viewerArea": "this.viewer_uidE5F3752E_F6B7_CDA1_41D8_C751C98EF555",
 "id": "viewer_uidE5F3752E_F6B7_CDA1_41D8_C751C98EF555VideoPlayer",
 "displayPlaybackBar": true,
 "class": "VideoPlayer"
},
{
 "viewerArea": "this.viewer_uidE5FB7534_F6B7_CDA1_41C4_0A65E1AA55A3",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5FB7534_F6B7_CDA1_41C4_0A65E1AA55A3PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5FB7534_F6B7_CDA1_41C4_0A65E1AA55A3",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3328"
 }
},
{
 "viewerArea": "this.viewer_uidE5FB9534_F6B7_CDA1_41D0_B0BBFA14EB43",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5FB9534_F6B7_CDA1_41D0_B0BBFA14EB43PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "viewerArea": "this.viewer_uidE5FE5530_F6B7_CDA1_41E2_545226200AA4",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5FE5530_F6B7_CDA1_41E2_545226200AA4PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5E41535_F6B7_CDA3_41D6_C151FA10190A",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3329"
 }
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5FB9534_F6B7_CDA1_41D0_B0BBFA14EB43",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3327"
 }
},
{
 "viewerArea": "this.viewer_uidE5FC052F_F6B7_CDBF_41DE_BCD086C7CFD9",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5FC052F_F6B7_CDBF_41DE_BCD086C7CFD9PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "viewerArea": "this.viewer_uidE5E52535_F6B7_CDA3_41E7_35D9B3D40536",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5E52535_F6B7_CDA3_41E7_35D9B3D40536PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5FDF52F_F6B7_CDBF_41E2_F0001904935B",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3322"
 }
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5FC052F_F6B7_CDBF_41DE_BCD086C7CFD9",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3321"
 }
},
{
 "viewerArea": "this.viewer_uidE5F96533_F6B7_CDA7_41E1_E627C6795A29",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5F96533_F6B7_CDA7_41E1_E627C6795A29PanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5FEB530_F6B7_CDA1_41E0_4CA50E0EDB58",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3323"
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "areas": [
  {
   "click": "this.showPopupPanoramaOverlay(this.popup_A6D72EB7_BF2E_297E_41DB_B8B0A69D8D71, {'iconLineWidth':5,'rollOverIconHeight':20,'pressedIconHeight':20,'rollOverIconColor':'#666666','rollOverBorderColor':'#000000','backgroundColorRatios':[0,0.09803921568627451,1],'rollOverIconWidth':20,'pressedBorderSize':0,'paddingRight':5,'paddingLeft':5,'rollOverBackgroundOpacity':0.3,'pressedBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'borderSize':0,'pressedIconColor':'#888888','backgroundOpacity':0.3,'iconHeight':20,'rollOverBackgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'backgroundColorDirection':'vertical','pressedIconWidth':20,'iconColor':'#000000','paddingTop':5,'rollOverIconLineWidth':5,'pressedBorderColor':'#000000','iconWidth':20,'borderColor':'#000000','rollOverBorderSize':0,'paddingBottom':5,'pressedBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundColorDirection':'vertical','rollOverBackgroundColorRatios':[0,0.09803921568627451,1],'pressedBackgroundOpacity':0.3,'backgroundColor':['#DDDDDD','#EEEEEE','#FFFFFF'],'pressedIconLineWidth':5,'rollOverBackgroundColorDirection':'vertical'}, this.ImageResource_9BD48771_BF72_27F5_41E7_DAF1962D5253, null, null, null, null, false)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Poligon"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 52.66,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_0_0.png",
      "width": 1290,
      "height": 974,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.61,
   "class": "HotspotPanoramaOverlayImage",
   "roll": 0,
   "yaw": 89.18
  }
 ],
 "id": "overlay_A7F22179_BF2E_FBF2_41C6_2C6A56310698",
 "maps": [
  {
   "hfov": 52.66,
   "yaw": 89.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_0_1_0_map.gif",
      "width": 200,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "if(this.getGlobalAudio(this.audio_A61333B3_BF52_3F75_41C0_083E46F7B44F).get('state') == 'playing') { this.pauseGlobalAudio(this.audio_A61333B3_BF52_3F75_41C0_083E46F7B44F); } else { var src = this.playGlobalAudioWhilePlay(this.mainPlayList, 0, this.audio_A61333B3_BF52_3F75_41C0_083E46F7B44F); var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else { this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); }",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.74,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_1_0.png",
      "width": 64,
      "height": 61,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.8,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 111.49
  }
 ],
 "id": "overlay_A79E3A18_BF2E_6933_4183_23B529B6E83F",
 "maps": [
  {
   "hfov": 2.74,
   "yaw": 111.49,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525, this.camera_E56B759D_F6B7_CD63_41A4_5F6B8298A24C); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.09,
   "image": "this.AnimatedImageResource_9B0E675E_BF72_272F_4185_58F60A69BC9B",
   "pitch": -33.53,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -7.66,
   "distance": 100
  }
 ],
 "id": "overlay_A5A2F4DA_BF6E_1937_41E6_2592D8C0C379",
 "maps": [
  {
   "hfov": 19.09,
   "yaw": -7.66,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_2_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -33.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD, this.camera_E57B4591_F6B7_CD63_41D2_19FAB042EF48); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "data": {
  "label": "Circle Arrow 01b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.89,
   "image": "this.AnimatedImageResource_9B0EA75E_BF72_272F_41C8_0198191AFF7B",
   "pitch": -24.18,
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 173.16,
   "distance": 100
  }
 ],
 "id": "overlay_A4D4225B_BF6E_1936_41E1_32CC3C337BB3",
 "maps": [
  {
   "hfov": 20.89,
   "yaw": 173.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_3_0_0_map.gif",
      "width": 37,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.18,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66.png",
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9.png",
 "pressedRollOverIconURL": "skin/IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9_pressed.png",
 "visible": false,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton HS "
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_679D2E20_7179_CC6A_41B7_F4887B252114.png",
 "pressedRollOverIconURL": "skin/IconButton_679D2E20_7179_CC6A_41B7_F4887B252114_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_679D2E20_7179_CC6A_41B7_F4887B252114_pressed.png",
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "viewerArea": "this.viewer_uidE5E69535_F6B7_CDA3_41DD_289BA50156CA",
 "buttonCardboardView": "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
 "buttonToggleHotspots": "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
 "class": "PanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "id": "viewer_uidE5E69535_F6B7_CDA3_41DD_289BA50156CAPanoPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
 "mouseControlMode": "drag_rotation"
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "viewer_uidE5E65536_F6B7_CDA1_41D6_76E00DF0487D",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "horizontal",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "class": "ViewerArea",
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "ViewerArea3332"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_679D9E20_7179_CC6A_41D2_5F5D75BA8E2D",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "class": "Container",
 "paddingLeft": 0,
 "children": [
  "this.IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "width": 56,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 84,
 "top": "0%",
 "gap": 10,
 "layout": "horizontal",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "visible",
 "data": {
  "name": "button menu sup"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "right": "0%",
 "class": "Container",
 "children": [
  "this.IconButton_679D5E20_7179_CC6A_41DA_CFBDEB894C66",
  "this.IconButton_679D2E20_7179_CC6A_41B7_F4887B252114",
  "this.IconButton_679D3E20_7179_CC6A_41CD_DD63234112A0",
  "this.IconButton_679D0E20_7179_CC6A_41C4_759B35B793F9",
  "this.IconButton_679D1E20_7179_CC6A_41CF_662941DB817D",
  "this.IconButton_6792FE20_7179_CC6A_41DA_F02E92328CA0",
  "this.Image_67F8E069_7168_F4FD_41C3_808E9834266C"
 ],
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": "81.519%",
 "width": "50.937%",
 "gap": 0,
 "layout": "vertical",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "-button set"
 },
 "overflow": "scroll"
},
{
 "maxHeight": 271,
 "propagateClick": false,
 "id": "Image_C6C7AAB5_C81F_A1AF_41C0_5D9062D984B6",
 "left": "0%",
 "paddingRight": 0,
 "class": "Image",
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_C6C7AAB5_C81F_A1AF_41C0_5D9062D984B6.gif",
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "width": "100%",
 "minWidth": 1,
 "click": "this.openLink('https://umayor.edu.co/', '_blank')",
 "height": "100%",
 "top": "0%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "data": {
  "name": "Image2801"
 },
 "cursor": "hand",
 "maxWidth": 271
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_9CD42421_BF75_F915_41C2_7AF2DC73F85A",
 "levels": [
  {
   "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_0_0.png",
   "width": 1220,
   "height": 780,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_9CDBA421_BF75_F915_41DE_47772E66CEF1",
 "levels": [
  {
   "url": "media/panorama_B5D7458A_BB78_643F_41D6_CFD96D3958FD_0_HS_1_0.png",
   "width": 1220,
   "height": 780,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_AEAFE12C_BE75_8F23_41DE_C19E21A79B25",
 "levels": [
  {
   "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_1_HS_0_0.png",
   "width": 1220,
   "height": 780,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_AEAF712D_BE75_8F3D_41E1_F7DB60B1522D",
 "levels": [
  {
   "url": "media/panorama_B5D38FF9_BB78_E3DC_41BB_CA0019769525_1_HS_1_0.png",
   "width": 1220,
   "height": 780,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_9CDB6421_BF75_F915_415C_65EFB5DE58CC",
 "levels": [
  {
   "url": "media/panorama_B5D6BD33_BB78_646D_41D9_99A448421FEC_0_HS_0_0.png",
   "width": 1220,
   "height": 780,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A4A2E691_BEB7_9F5F_41C1_1E58DC3CC458",
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_11_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A4A25692_BEB7_9F5D_41E6_A97AB3941196",
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_12_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A4A39692_BEB7_9F5D_41E0_286E1D0BD12B",
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_13_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A4A0D692_BEB7_9F5D_41DD_50EF85E5DB37",
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_14_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A4A1A693_BEB7_9F43_41E1_6BB29DD818C2",
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_16_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A4A6E693_BEB7_9F43_41CF_6FF343C909DB",
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_17_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A4A63693_BEB7_9F43_41E4_8F77876F947E",
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_18_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_A4A6F694_BEB7_9F45_417C_6C246082767C",
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_19_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_9CD55420_BF75_F913_41D3_7A48F90DF16B",
 "levels": [
  {
   "url": "media/panorama_B5C9D560_BB78_A4EC_4176_FC153BC263F4_0_HS_20_0.png",
   "width": 1220,
   "height": 780,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_D461C14F_C559_6B4A_41D5_1C96710D9973",
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_D46EF14F_C559_6B4A_41D5_C326E5BD1BB5",
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_2_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_D46E414F_C559_6B4A_41D6_1A58FC730F5B",
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_D46F8150_C559_6B56_41E4_0F480C3C4F98",
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_4_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_D46CC150_C559_6B56_41C0_2B5D50FC0C54",
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_5_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_D46FB150_C559_6B56_41E0_6BA58B9F2770",
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_6_0.png",
   "width": 680,
   "height": 1020,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_D46F5151_C559_6B56_41E4_1414340655C1",
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_7_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_D46C9151_C559_6B56_41E5_1AE858BE7819",
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_1_HS_8_0.png",
   "width": 1220,
   "height": 1110,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_DF95A6A2_C548_A9F5_41BC_5ADA030DEDB1",
 "levels": [
  {
   "url": "media/panorama_D4FDEF28_C548_B8F6_41DE_1CE3D4E09583_0_HS_12_0.png",
   "width": 1220,
   "height": 780,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_9B0E675E_BF72_272F_4185_58F60A69BC9B",
 "levels": [
  {
   "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_2_0.png",
   "width": 1220,
   "height": 780,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 33,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_9B0EA75E_BF72_272F_41C8_0198191AFF7B",
 "levels": [
  {
   "url": "media/panorama_B5D46D7B_BB78_A4DD_41DB_1E3621BA41EE_0_HS_3_0.png",
   "width": 1220,
   "height": 780,
   "class": "ImageResourceLevel"
  }
 ]
},
{
 "transparencyActive": true,
 "maxHeight": 60,
 "propagateClick": true,
 "id": "IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F.png",
 "pressedRollOverIconURL": "skin/IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F_pressed_rollover.png",
 "minWidth": 1,
 "mode": "toggle",
 "click": "if(!this.Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A.get('visible')){ this.setComponentVisibility(this.Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_679D4E20_7179_CC6A_41CF_BEB9A80A562A, false, 0, null, null, false) }",
 "height": 60,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_679D6E20_7179_CC6A_41D6_FDDC1DA4930F_pressed.png",
 "cursor": "hand",
 "maxWidth": 60,
 "data": {
  "name": "image button menu"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "propagateClick": true,
 "id": "IconButton_6792FE20_7179_CC6A_41DA_F02E92328CA0",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_6792FE20_7179_CC6A_41DA_F02E92328CA0.png",
 "minWidth": 1,
 "mode": "push",
 "click": "this.openLink('https://www.facebook.com/UmayorCtg', '_blank')",
 "height": 58,
 "rollOverIconURL": "skin/IconButton_6792FE20_7179_CC6A_41DA_F02E92328CA0_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "IconButton FB"
 }
},
{
 "maxHeight": 58,
 "propagateClick": false,
 "id": "Image_67F8E069_7168_F4FD_41C3_808E9834266C",
 "paddingRight": 0,
 "class": "Image",
 "paddingLeft": 0,
 "borderSize": 0,
 "url": "skin/Image_67F8E069_7168_F4FD_41C3_808E9834266C.png",
 "width": 35,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "minWidth": 1,
 "click": "this.openLink('https://wa.me/qr/SZEYYL5TW57AL1', '_blank')",
 "height": 48,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "scaleMode": "fit_inside",
 "borderRadius": 0,
 "cursor": "hand",
 "maxWidth": 58,
 "data": {
  "name": "Image29745"
 }
}],
 "desktopMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
