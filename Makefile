build: 
	node_modules/.bin/react-scripts build
	node update-app-html.js
	rm -f app/static/js/*.js
	cp build/static/js/*.js app/static/js
	cp build/static/js/*.js.map app/static/js
	
	
	rm -f app/static/css/*.css
	rm -f app/static/css/*.css.map
	cp build/static/css/*.css app/static/css
	cp build/static/css/*.css.map app/static/css

	npx zet pack


build_for_windows:
	npm run build
	node update-app-html.js
	del /Q app\static\js\*.js
	copy build\static\js\*.js app\static\js
	copy build\static\js\*.js.map app\static\js
	
	
	del /Q app\static\css\*.css
	del /Q app\static\css\*.css.map
	copy build\static\css\*.css app\static\css
	copy build\static\css\*.css.map app\static\css
	npx zet pack


.PHONY: build