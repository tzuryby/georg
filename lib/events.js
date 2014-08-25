/******************************************************************************
 * Copyright (c) 2014 Risk Academi Ltd. All rights reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/

var riemannConnection = require('./riemannConnection.js');
var machineName = '';

/**
 * @param service The name of the service all events will be sent from.
 */
exports.setMachineName = function(name) {
    machineName = name;
}

/**
 * Send event to riemann.
 * @param eventParams parameters for the event, all optional:
 * - description {String} - general description of the event
 * - service {String} - the name of the service responsible for the event. Will be concatenated to the name.å
 * - metric {double} - the value for the sub service event (for example - in queue producer service this will be the
 * number of queues connected).
 * - tags {List<String>} tags for the event (the event will be filtered by these tags by Riemann to determine the
 * required action).
 */
exports.sendEvent = function(eventParams) {
    var event = riemannConnection.riemannClient.Event({
        description: eventParams.description,
        service: machineName + " " + eventParams.service + ".",
        metric: eventParams.metric,
        tags: eventParams.tags
    });
    riemannConnection.riemannClient.send(event, riemannConnection.riemannClient.tcp);
}
