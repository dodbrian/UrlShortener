FROM microsoft/dotnet:2.1-sdk AS build-env
WORKDIR /app

# Set up node
ENV NODE_VERSION 9.11.2
ENV NODE_DOWNLOAD_SHA bbb46f86c64abe96ee98faa733424fc76f20a38d12f59bdcd60057efa5f1ce89
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

# Copy sln and csproj and restore as distinct layers
COPY *.sln ./
COPY ./UrlShortener.*/*.csproj ./UrlShortener.Core/
COPY ./UrlShortener.Data/*.csproj ./UrlShortener.Data/
COPY ./UrlShortener.Web/*.csproj ./UrlShortener.Web/
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/UrlShortener.Web/out .
ENTRYPOINT ["dotnet", "UrlShortener.dll"]
