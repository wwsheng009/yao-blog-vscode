/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

"use strict";

import { Url, parse as parseUrl } from "url";
import { isBoolean } from "./common";
import HttpProxyAgent from "http-proxy-agent";
import HttpsProxyAgent from "https-proxy-agent";

function getSystemProxyURL(requestURL: Url): string | undefined {
  if (requestURL.protocol === "http:") {
    return process.env.HTTP_PROXY || process.env.http_proxy || undefined;
  } else if (requestURL.protocol === "https:") {
    return (
      process.env.HTTPS_PROXY ||
      process.env.https_proxy ||
      process.env.HTTP_PROXY ||
      process.env.http_proxy ||
      undefined
    );
  }

  return undefined;
}

export function getProxyAgent(
  requestURL: Url,
  proxy: string,
  strictSSL: boolean
): any {
  const proxyURL = proxy || getSystemProxyURL(requestURL);

  if (!proxyURL) {
    return null;
  }

  const proxyEndpoint = parseUrl(proxyURL);

  if (proxyEndpoint.protocol && !/^https?:$/.test(proxyEndpoint.protocol)) {
    return null;
  }

  const opts = {
    host: proxyEndpoint.hostname!,
    port: Number(proxyEndpoint.port),
    auth: proxyEndpoint.auth,
    rejectUnauthorized: isBoolean(strictSSL) ? strictSSL : true,
  };

  return requestURL.protocol === "http:"
    ? new HttpProxyAgent(opts)
    : new HttpsProxyAgent(opts);
}
