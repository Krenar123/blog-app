# frozen_string_literal: true

class Post < ApplicationRecord
    ################################ ASSOCIATIONS ################################
    has_many :comments, as: :commentable
    
    ################################## SETTINGS ##################################

    ################################### SCOPES ###################################

    ################################## DELEGATES #################################

    ################################# VALIDATIONS ################################

    ################################## CALLBACKS #################################
end
