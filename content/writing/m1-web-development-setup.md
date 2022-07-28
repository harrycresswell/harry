---
title: "M1 web development setup"
date: 2022-07-28T11:27:26+01:00
draft: false
description: ""
slug: "m1-web-development-setup"
topics: ["Tools"]
syndicate: "false"
---

I finally bit the bullet and bought a new MacBook Pro M1. I ran my well-loved MacBook Pro 2015 deep into the ground.

My aim with this machine is to try and keep it as lean as possible. So, I’ve refrained from mindlessly copying over my entire harddrive. Instead, I’ve tried to only install the essentials. Tools that I use on a daily basis for design and web development.

For those who are interesting, here are the steps I went through, including the apps I’ve installed and my general settings.


## Steps

- [Install Homebrew](#install-homebrew)
- [Install shell applications](#install-shell-applications)
- [Install GUI applications.](#install-gui-applications)
- [Setup shell with Oh My Zsh](#setup-shell-with-oh-my-zsh)
- [Install Node with nvm](#install-node-with-nvm)
- [Git configuration](#git-configuration)
- [GitHub CLI and SSH keys](#github-cli-and-ssh-keys)
- [macOS settings](#macos-settings)
- [Application settings](#application-settings)


## Install Homebrew

 The [Homebrew](https://brew.sh) package manager allows you to install macOS software via the command line.

Install it by pasting the following command in the terminal.

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

You will be asked for your password. 

```shell
Checking for `sudo` access (which may request your password)...
Password:
```

Type in your macOS user account password. When you type, nothing will show on screen for security. Once you’ve typed your password, hit enter.


When Homebrew finishes installing, check for any warnings. 

If you are using an M1 you will probably see the following warning:

```shell
Warning: /opt/homebrew/bin is not in your PATH.
```

Follow the instructions in the “Next steps” section to add Homebrew to your PATH:

```shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/harrycresswell/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

```

Finally, make sure everything is up to date.

```shell
brew update
```

## Install shell applications

Install Shell applications using Homebrew.

| Application | Purpose               |
| ----------- | --------------------- |
| git         | version control       |
| go          | programming language  |
| hugo        | static site generator |


```bash
brew install \
  git \
  go \
  hugo \
```


## Install GUI applications.

Install GUI applications using Homebrew

```bash
brew install --cask \
  affinity-photo \
  affinity-designer \
  bitwarden \
  brave-browser \
  figma \
  firefox \
  glyphs \
  hyper \
  iconjar \
  imageoptim \
  maccy \
  nordvpn \
  numi \
  obsidian \
  rectangle \
  signal \
  slack \
  spotify \
  sync \
  tutanota \
  typora \
  visual-studio-code \
  vivaldi \
```

Use [Homebrew Formulae](https://formulae.brew.sh/cask/figma#default) to find out if there is a cask available for the app you want to install.

Apps without a cask to install manually:

- [Raivo OTP](https://github.com/raivo-otp/)
- [Firefox developer edition](https://www.mozilla.org/en-US/firefox/developer/)


## Setup shell with Oh My Zsh

Install [Oh My Zsh](https://ohmyz.sh) to configure Zsh shell with sensible defaults. 

```shell
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```


## Install Node with nvm

Use Node Version Manager (nvm) to install Node.js. This will allow you to switch you version of Node easily. 

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Now close your terminal, then reopen to start nvm.

### Install

Install the latest version of Node.

```shell
nvm install node
```

Make sure you’re using nvm version of node.

```shell
nvm use node
```

Confirm you’re using the latest verison of nvm, Node and npm.

```shell
nvm --version && node -v && npm -v
```


### Update

If you need to update nvm in the future, use the following command:

```shell
nvm install node --reinstall-packages-from=node
```


### Change version

```shell
nvm install xx.xx
```

```shell
nvm use xx.xx
```


## Git configuration

Set up your global name and email.

```shell
git config --global user.name "Firstname Lastname"
git config --global user.email you@example.com
```

Set default branch name to `main` instead of master.

```shell
git config --global init.defaultBranch main
```

Check your global configurations.

```shell
git config --list
user.name=Firstname Lastname
user.email=you@example.com
init.defaultBranch main
```

Check specific values using the following command:

```shell
git config <key>
```

For example, to check your username:

```shell
git config user.name
Firstname Lastname
```

You can also use the following command to open and edit your global configurations, directly from your git config file.

```shell
open ~/.gitconfig
```

```shell // gitconfig
[user]
  name   = Firstname Lastname
  email  = you@example.com
[github]
  user   = username
[alias]
  a      = add
  ca     = commit -a
  cam    = commit -am
  cm     = commit -m
  s      = status
  p      = push
  pom    = push origin master
  puom   = pull origin master
  cob    = checkout -b
  co     = checkout
  fp     = fetch --prune --all
  l      = log --oneline --decorate --graph
  lall   = log --oneline --decorate --graph --all
  ls     = log --oneline --decorate --graph --stat
```

https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup


## GitHub CLI and SSH keys

The [Github CLI](https://cli.github.com) allows you to interact with Github from the command line.

Install it using Homebrew with the following command:

```shell
brew install gh
```

Now login by copy and pasting the following command into the terminal.

```shell
gh auth login -s 'user:email' -w
```

The Github CLI will ask you several questions.

```shell
? What is your preferred protocol for Git operations?
``` 

With the arrows, choose `SSH` and press `Enter`. SSH is a protocol to log in using SSH keys instead of the well known username/password pair.

```shell
Generate a new SSH key to add to your GitHub account?
```

Press `Enter` to ask gh to generate the SSH keys for you.

If you already have SSH keys, you will see instead:  

```shell
Upload your SSH public key to your GitHub account?
```

With the arrows, select your public key file path and press `Enter`.

```shell
Enter a passphrase for your new SSH key (Optional)
```

Then press `Enter` to leave this blank.  Unless you want to enter a passphrase each time you commit and push changes to GitHub. In which case, enter a passphrase of your choice.

```
Title for your SSH key
```

Choose something descriptive like MacBookPro (14-inch, 2021).

You will then see the following, with a unqiue one-time code:

```shell
! First copy your one-time code: 7270-8A57
Press Enter to open github.com in your browser... 
```

Copy your one-time code, then press `enter`.

Your browser will open and ask you to authorize GitHub CLI with your Github account.

Once your account is authorized, you will see something like this in your terminal:

```shell
Authentication complete.
- gh config set -h github.com git_protocol ssh
✓ Configured git protocol
✓ Uploaded the SSH key to your GitHub account: /Users/harrycresswell/.ssh/id_ed25519.pub
✓ Logged in as harrycresswell
```

You can check your connection using the following command:

```shell
gh auth status
```

If your configured and connected correctly, you will see the following:

```
github.com
  ✓ Logged in to github.com as harrycresswell (oauth_token)
  ✓ Git operations for github.com configured to use ssh protocol.
  ✓ Token: *******************
```


## macOS settings
- System Preferences:
	- Siri:
			- Disable *Ask Siri*
	- Dock & Menu bar:
		- Remove all apps except Finder, System Preferences and Trash
		- Reduce Dock size
		- Turn on *Automatically hide and show the Dock*
		- Turn off *Show recent applications in Dock*
		- Battery > Turn on *Show percentage*
	- Notifications:
		- Turn off all notifications
	- Security & Privacy:
		- FileVault > *Turn FileVault On*
		- Apps that can control computer:
			- Privacy > Accessibility > Add Rectangle
			- Privacy > Camera > Add browser
			- Privacy > Microphone > Add browser
			- Privacy > Screen Recording > Add browser
	- Touch ID:
		- Enable
	- Bluetooth:
		- Pair Trackpad, Keyboard and Airpods Pro
	- Trackpad
		- Increase *Tracking speed*
	- Keyboard
		- Text
			- Disable *Capitalise word automatically*
			- Disable *Add full stop with double space*
			- Disable *Use Smart quotes and dashes*
	- Displays
		- Night Shift > Sunset to Sunrise
	- Sharing:
		- Disable file sharing
		- Update *Computer Name*
- Finder:
	- View > Show status bar
	- View > Show path bar
	- Sidebar:
		- Favourites
			- Disable Recents, Documents, Movies, Music and Pictures
		- General
			- Show these items on desktop:
				- External Disks 
				- CDs, DVDs and iPods


## Application settings




### Visual Studio Code

Press `CMD + SHIFT + P`, then search “Install code command in PATH” and click to start using `code .` to open files from the terminal in VSCode.

VS Code has a feature called [Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync) which you can use sync your VSCode settings, keybindings and extensions with your new device. It makes the transition from one machine to another seamless.

#### Extensions

- [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl)
-  [Better TOML](https://marketplace.visualstudio.com/items?itemName=bungcip.better-toml)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Go](https://marketplace.visualstudio.com/items?itemName=golang.Go)
- [Hugo Language and Syntax Support](https://marketplace.visualstudio.com/items?itemName=budparr.language-hugo-vscode)
- [Liquid](https://marketplace.visualstudio.com/items?itemName=neilding.language-liquid)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Open in Typora](https://marketplace.visualstudio.com/items?itemName=cyberbiont.vscode-open-in-typora)
- [Shopify Liquid Template Snippets](https://marketplace.visualstudio.com/items?itemName=killalau.vscode-liquid-snippets)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [VSCode Great Icons](https://marketplace.visualstudio.com/items?itemName=emmanuelbeziat.vscode-great-icons)

### Hyper

To edit Hyper theme and settings, open the preferences file in VSCode.

```
code ~/.hyper.js
```

Then update the exports object with the following config and plugins.

```
module.exports = {
	config: {
		 ...
		fontSize: 13,
		...
		hyperBorder: {
			borderColors: ['#fc1da7', '#542bff'],
			borderWidth: '4px',
			animate: true,
		},
		...
	},
	...
	plugins: [
		'hyper-night-owl',
		'hyperborder',
	],
	...
};
```

#### Plugins
- [hyper-night-owl](https://github.com/pbomb/hyper-night-owl)
- [hyperborder](https://github.com/webmatze/hyperborder)


### Vivaldi

Create an account with Vivaldi on your previous machine, if you haven’t already. 
From your new machine, head to *Settings > Sync* to sync all your settings.

- Settings > Search > Set Default Seach Engine to DuckDuckGo

#### Browser extensions

- [Bitwarden](https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb)
- [SimpleLogin](https://chrome.google.com/webstore/detail/simpleloginreceive-send-e/dphilobhebphkdjbpfohgikllaljmgbn)
- [Notion Web Clipper](https://chrome.google.com/webstore/detail/notion-web-clipper/knheggckgoiihginacbkhaalnibhilkk)
- [Bubbles](https://chrome.google.com/webstore/detail/bubbles-screenshot-and-sc/ppbfhhgcdehhbjigifndnfmcihegokbb)
- [GoFullPage](https://chrome.google.com/webstore/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl)
- [Fonts Ninja](https://chrome.google.com/webstore/detail/fonts-ninja/eljapbgkmlngdpckoiiibecpemleclhh)


## Summary

How you setup a new machine is always going to be a personal thing, but I hope you’ve found some of this helpful for your own. 

I’ll add that writing this stuff down is a great idea. If not just for yourself. Setting up a new machine for web development can be overwhelming, but with a roadmap to follow the process is a whole lot easier.

Whilst much of my setup was inspired by my previous one, I have to shout out the folk below. To some extent these setups have inspired my own.



## Resources
- [My 2022 New Mac Setup](https://www.swyx.io/new-mac-setup/) from swyx
- [Mac Setup for Web Development [2022]](https://www.robinwieruch.de/mac-setup-web-development/) from Robin Wieruch
- [macOS Monterey: Setting up a Mac for Development](https://www.taniarascia.com/setting-up-a-brand-new-mac-for-development/?ck_subscriber_id=591519942#homebrew) from Tania Rascia
