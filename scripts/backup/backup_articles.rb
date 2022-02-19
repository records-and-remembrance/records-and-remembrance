require 'dotenv/load'
require 'json'
require 'mechanize'
require 'debug'

LOGIN_URL = 'https://www.hatena.ne.jp/login?location=%2F%2Fblog.hatena.ne.jp%2Fgo%3Fblog%3Dhttp%253A%252F%252Fmonden-info.hatenablog.com%252F'
ID = 'goodrollings'
PASS = ENV['PASS']
BLOG_URL = 'http://monden-info.hatenablog.com/'
SAVE_DIR = './articles/'
LINKS_JSON_PATH = 'links.json'

def agent
  @agent ||=
    Mechanize.new do |a|
      a.user_agent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)'
      a.verify_mode = OpenSSL::SSL::VERIFY_NONE
    end
end

def login
  agent.get(LOGIN_URL)
  binding.b
  form = agent.page.form
  form.field_with(name: 'name').value = ID
  form.field_with(name: 'password').value = PASS
  form.submit
end

def parse_page(page)
  binding.b
  attrs_json = page.at('html').attribute('data-initial-state').value
  attrs = JSON.parse(attrs_json)

  {
    cats:       attrs.dig('editor.selectedCategories'),
    posted_at:  attrs.dig('editor.entryOption', 'datetime'),
    custom_url: attrs.dig('editor.entryOption', 'customUrl'),
    title:      page.at('.editor-title-input').attribute('value')&.text&.toutf8,
    content:    page.at('.editor-body-textarea')&.text&.toutf8,
    type:       page.at('.syntax-switcher')&.text&.strip
  }
end

def file_exist?(article)
  File.exist?("#{SAVE_DIR}#{article[:id]}.json")
end

def load_articles
  links = JSON.parse(open(LINKS_JSON_PATH).read).values
  links.map do |l|
    { id: l.split('entry=')[1], link: l }
  end
end

def crawl_articles(articles)
  articles.map do |article|
    next if file_exist?(article)
    sleep 1
    puts "request: #{article[:link]}"
    page = agent.get(article[:link])
    page_hash = parse_page(page)
    article.merge(page_hash)
  end
end

def save_as_each_json(crawled_articles)
  crawled_articles.map do |article|
    File.write("#{SAVE_DIR}#{article[:id]}.json", article.to_json)
  end
end

def main
  puts "start backup!"
  login
  articles = load_articles
  crawled_articles = crawl_articles(articles).compact
  save_as_each_json(crawled_articles)
  puts "result: backup-ed #{crawled_articles.size} files"
end

main
