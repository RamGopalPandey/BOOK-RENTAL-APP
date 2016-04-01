require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BookApp
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
    # Heroku requires this to be false
    config.assets.initialize_on_precompile=false
    config.serve_static_files = true
    config.assets.precompile += %w( angular-flash.min.css)
    config.assets.precompile += %w( flashes.css)
    config.assets.precompile += %w( style.css )
    config.assets.precompile += %w(bootstrap.css)
    config.assets.precompile += %w( font-awesome.css )
    config.assets.precompile += %w( jquery.simpleLens.css )
    config.assets.precompile += %w( jquery.smartmenus.bootstrap.css )
    config.assets.precompile += %w( normalize.css )
    config.assets.precompile += %w( nouislider.css )
    config.assets.precompile += %w( sequence-theme.modern-slide-in.css )
    config.assets.precompile += %w( slick.css )
    config.assets.precompile += %w( user.scss )
    config.assets.precompile += %w( bridge-theme.css )
    config.assets.precompile += %w( dark-red-theme.css )
    config.assets.precompile += %w( default-theme.css )
    config.assets.precompile += %w( green-theme.css )
    config.assets.precompile += %w( lite-blue-theme.css )
    config.assets.precompile += %w( pink-theme.css )
    config.assets.precompile += %w( purple-theme.css )
    config.assets.precompile += %w( red-theme.css )
    config.assets.precompile += %w( orange-theme.css )
    config.assets.precompile += %w( yellow-theme.css )
    config.assets.precompile += %w( angular-animate.js)
    config.assets.precompile += %w( angular-cookies.js)
    config.assets.precompile += %w( angular-flash.min.js)
    config.assets.precompile += %w( book.js )
    config.assets.precompile += %w( bootstrap.js )
    config.assets.precompile += %w( custom.js )
    config.assets.precompile += %w( jquery.simpleGallery.js )
    config.assets.precompile += %w( jquery.simpleLens.js )
    config.assets.precompile += %w( jquery.smartmenus.bootstrap.js )
    config.assets.precompile += %w( jquery.smartmenus.js )
    config.assets.precompile += %w( nouislider.js )
    config.assets.precompile += %w( sequence.js )
    config.assets.precompile += %w( sequence-theme.modern-slide-in.js )
    config.assets.precompile += %w( slick.js )
    
    
    
    
    
  end

end

