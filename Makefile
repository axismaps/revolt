build-dir =			Build/
yui-jar =			tools/yuicompressor-2.4.8pre.jar

html-replace =		$(build-dir)map.html
html-prereq =		ie8.html \
					index.html \
					map.html \

dir-prereq =		data \
					images \
					lib \
					tiles \

css-path =			css/
css-build-path = 	$(build-dir)css/
css-page-target =	$(css-build-path)vilnius.min.css
css-page-prereq =	$(css-path)main.css

js-path =			com/
js-build-path =		$(build-dir)com/
js-page-target =	$(js-build-path)vilnius.min.js
js-page-prereq =	$(js-path)category.js \
					$(js-path)filter.js \
					$(js-path)gallery.js \
					$(js-path)intro.js \
					$(js-path)map.js \
					$(js-path)place.js \
					$(js-path)search.js \
					$(js-path)time.js \
					$(js-path)tours.js \
					$(js-path)utility.js \
					$(js-path)view.js \
	
all: $(css-page-target) $(js-page-target)

clean:
	@rm -rf $(build-dir)
	
install: js-build := `cat $(js-page-target) | /usr/bin/openssl sha1 | cut -c1-8`.js
install: css-build := `cat $(css-page-target) | /usr/bin/openssl sha1 | cut -c1-8`.css
install: copy-dir copy-html all
	@cp $(css-page-target) $(css-build-path)$(css-build)
	@cp $(js-page-target) $(js-build-path)$(js-build)
	@echo "Linking to updated CSS and JavaScript…\t\c"
	@sed -i.bak "s|\"com\/.*\.js\"|\"com\/$(js-build)\"|g" $(html-replace)
	@sed -i.bak "s|\"css\/.*\.css\"|\"css\/$(css-build)\"|g" $(html-replace)
	@sed -i.bak "$$!N; /^\(.*\)\n\1$$/!P; D" $(html-replace)
	@rm $(css-page-target)
	@rm $(js-page-target)
	@rm $(html-replace).bak
	@echo "[ Done ]"
	@echo "Installation is complete."
	
$(css-page-target): $(css-page-prereq)
	@rm -rf $(css-build-path)
	@mkdir -p $(css-build-path)
	@rm -f $(css-page-target)
	@echo "Merging CSS files…\t\t\t\c"
	@cat $(css-page-prereq) > $(css-path)tmp.css
	@echo "[ Done ]"
	@echo "Compressing merged CSS…\t\c"
	@java -jar $(yui-jar) -o $(css-page-target) $(css-path)tmp.css
	@echo "[ Done ]"
	@rm -f $(css-path)tmp.css

$(js-page-target): $(js-page-prereq)
	@rm -rf $(js-build-path)
	@mkdir -p $(js-build-path)
	@rm -f $(js-page-target)
	@echo "Merging JS files…\t\t\t\c"
	@cat $(js-page-prereq) > $(js-path)tmp.js
	@echo "[ Done ]"
	@echo "Compressing merged JS…\t\c"
	@java -jar $(yui-jar) -o $(js-page-target) $(js-path)tmp.js
	@echo "[ Done ]"
	@rm -f $(js-path)tmp.js

copy-dir: ; $(foreach dir,$(dir-prereq),rsync -rupE --delete --exclude=".svn*" $(dir) $(build-dir) && ) :
copy-html: 
	@rm -f $(html-replace)
	$(foreach html,$(html-prereq),rsync -rupE --delete --exclude=".svn*" $(html) $(build-dir) && ) :